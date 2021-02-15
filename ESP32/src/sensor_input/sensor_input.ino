#include "Arduino.h"

int measurePin = 36; // Input pin
int ledPower = 32;   // Output pin

int samplingTime = 280; // 0.28ms
int deltaTime = 40;     //0.04ms
int sleepTime = 9680;   // 9.68ms

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(ledPower, OUTPUT);
}

void loop()
{
  Serial.println(getAverage());
  delay(1000);
}

int getAverage()
{
    int total = 0;
    int count = 0;
  
  for (int i=0; i < 10; i++){
    digitalWrite(ledPower, LOW); // power on the LED
    delayMicroseconds(samplingTime);
  
    voMeasured = analogRead(measurePin); // read the dust value
  
    delayMicroseconds(deltaTime);
    digitalWrite(ledPower, HIGH); // turn the LED off
    delayMicroseconds(sleepTime);
  
    calcVoltage = voMeasured * (3.3 / 1024.0); // Mapping voltage to a value between 0-1024
  
    dustDensity = 170 * calcVoltage - 0.1;

    if (dustDensity >= 0)
    {
      total += dustDensity;
      count += 1;
    }
 }

  if (count == 0)
    {
      return -1;
    }
  return (total / count);
}
