#include <DHT.h>;
#include <MKRWAN.h>;
#include <Adafruit_BMP280.h>
#include "keys.h"

#define DHTPIN 7      // what pin we're connected to
#define DHTTYPE DHT22 // DHT 22  (AM2302)
#define DEBUG 0

DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino
LoRaModem modem;
Adafruit_BMP280 bmp; // I2C Interface

/*
    Sets up the BMP280 sensor.
*/
bool setupBMP(Adafruit_BMP280 &bmp)
{
    if (!bmp.begin())
    {
        Serial.println(F("Could not find a valid BMP280 sensor, check wiring!"));
    }

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
            delay(1000);
            Serial.println("Modem begin failed.");
        }
    };

    #if DEBUG == 0
    int connected = modem.joinOTAA(appEui, appKey);
    #else
    int connected = 1;
    #endif


    if (connected)
    {
        Serial.println("Connected.");
    }
    else
    {
        Serial.println("Unable to connect or debugging.");
    }
    return connected;
}

void setup()
{
    Serial.begin(9600);

    #if DEBUG == 1
        while(!Serial);
    #endif
    
    Serial.println("Initiating..");

    setupBMP(bmp);
    setupDHT(dht);
    setupModem(modem);
}

void loop()
{

    //Read data and store it to variables hum and temp
    uint16_t dht_tmp = dht.readTemperature() * 10;
    Serial.print(F("DHT temp = "));
    uint8_t hum = dht.readHumidity();
    Serial.print(dht_tmp);
    Serial.println(" *C");
    Serial.print(F("DHT hum = "));
    Serial.println(hum);

    // BMP
    Serial.print(F("BMP temp = "));
    uint16_t bmp_tmp = bmp.readTemperature();
    Serial.print(bmp_tmp);
    Serial.println(" *C");

    uint32_t pressure = bmp.readPressure();
    Serial.print(F("Pressure = "));
    Serial.print(pressure/100); //displaying the Pressure in hPa, you can change the unit
    Serial.println(" hPa");


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

    delay(10000);
}
