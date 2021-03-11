#include <DHT.h>;
#include <MKRWAN.h>;
#include <Adafruit_BMP280.h>
#include "keys.h"
#include "ArduinoLowPower.h"

#define DHTPIN 7      // what pin DHT22 is connected to
#define DHTTYPE DHT22 // DHT 22  (AM2302)
#define DEBUG 0       // Debug does not connect to TTN

DHT dht(DHTPIN, DHTTYPE); // Initialize DHT sensor for normal 16mhz Arduino
LoRaModem modem;
Adafruit_BMP280 bmp; // I2C Interface

/*
    Sets up the BMP280 sensor.
*/
bool setupBMP(Adafruit_BMP280 &bmp)
{
    bmp.begin();

    /* Default settings from datasheet. */
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                    Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                    Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                    Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                    Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

    return true;
}

/*
    Sets up the DHT22 sensor.
*/
bool setupDHT(DHT &dht)
{
    dht.begin();
    return true;
}

bool setupModem(LoRaModem &modem)
{
    if (!modem.begin(EU868))
    {
        while (1)
        { 
          //Failed to connect
        }
    };

    #if DEBUG == 0
    int connected = modem.joinOTAA(appEui, appKey);
    #else
    int connected = 1;
    #endif

    return connected;
}

void setup()
{
    setupBMP(bmp);
    setupDHT(dht);
    setupModem(modem);
}

void loop()
{
    
    //Read data and store it to variables
    uint16_t dht_tmp = dht.readTemperature() * 10;
    uint8_t hum = dht.readHumidity();
    uint32_t pressure = bmp.readPressure();
    uint16_t pm = random(5, 46); //Random function depending on temperature since dustsensor do no work

    // Payload
    byte payload[8];
    payload[0] = highByte(dht_tmp);
    payload[1] = lowByte(dht_tmp);
    payload[2] = (byte)hum;
    payload[3] = pressure >> 16;
    payload[4] = pressure >> 8;
    payload[5] = pressure;
    payload[6] = highByte(pm);
    payload[7] = lowByte(pm);


    // Transmission
    modem.setPort(3);
    modem.beginPacket();
    modem.write(payload, sizeof(payload));
    modem.endPacket(true);

    LowPower.sleep(3600000); // Sleep for 1h = 60min x 60sec x 1000ms
    dht.begin(); // DHT22 stopped working after deepsleep
}
