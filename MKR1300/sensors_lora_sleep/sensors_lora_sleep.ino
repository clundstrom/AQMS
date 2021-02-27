#include <DHT.h>;
#include <MKRWAN.h>;
#include <Adafruit_BMP280.h>
#include "keys.h"
#include "ArduinoLowPower.h"

#define DHTPIN 7      // what pin we're connected to
#define DHTTYPE DHT22 // DHT 22  (AM2302)
#define DEBUG 1

DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino
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
            digitalWrite(1, LOW);
            delay(500);
            digitalWrite(1, HIGH);
            delay(500); 
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
    pinMode(1, OUTPUT);
    setupBMP(bmp);
    setupDHT(dht);
    setupModem(modem);
}

void loop()
{
    //Read data and store it to variables hum and temp
    uint16_t dht_tmp = dht.readTemperature() * 10;
    uint8_t hum = dht.readHumidity();
    uint16_t bmp_tmp = bmp.readTemperature();
    uint32_t pressure = bmp.readPressure();
    uint16_t pm = random(5, 47);

    // Payload
    byte payload[6];
    payload[0] = highByte(dht_tmp);
    payload[1] = lowByte(dht_tmp);
    payload[2] = (byte)hum;
    payload[3] = pressure >> 16;
    payload[4] = pressure >> 8;
    payload[5] = pressure;

    // Transmission
    modem.setPort(3);
    modem.beginPacket();
    modem.write(payload, sizeof(payload));
    modem.endPacket(true);

    digitalWrite(1, LOW); // Turn off led
    LowPower.sleep(10000); // Sleep for 10s
    digitalWrite(1, HIGH); // Turn on led for 2 seconds
    delay(10000);
}
