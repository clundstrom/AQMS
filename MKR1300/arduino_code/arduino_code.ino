/*
  First Configuration
  This sketch demonstrates the usage of MKR WAN 1300/1310 LoRa module.
  This example code is in the public domain.
*/

//Libraries
#include <DHT.h>;
#include <MKRWAN.h>;
#include "keys.h"


//Constants
#define DHTPIN 7     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino

LoRaModem modem;

void setup() {
  /*
  pinMode(6, OUTPUT);
  digitalWrite(6, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);
  digitalWrite(6, LOW);
  */
  
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();

  if (!modem.begin(EU868)) {
    while (1) {
      /*digitalWrite(6, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(100);
      digitalWrite(6, LOW);
      delay(100);
      */  
    }
  };

  int connected = modem.joinOTAA(appEui, appKey);


  /*if (!connected) {
    while (1) {
      digitalWrite(6, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(100);
      digitalWrite(6, LOW);
      delay(100);  
    }
  }

  digitalWrite(6, HIGH);   // turn the LED on (HIGH is the voltage level)
  */

}

void loop() {

  //Read data and store it to variables hum and temp
  uint16_t temp = dht.readTemperature()*10;
  uint8_t hum = dht.readHumidity();

  byte payload[3];
  payload[0] = highByte(temp);
  payload[1] = lowByte(temp);
  payload[2] = (byte)hum;

  modem.setPort(3);
  modem.beginPacket();
  modem.write(payload, sizeof(payload));
  modem.endPacket(true);

  delay(10000);
  

}
