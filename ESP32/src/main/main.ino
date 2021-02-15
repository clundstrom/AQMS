#include "Arduino.h"

int measurePin = 36; // Input pin
int ledPower = 32;   // Output pin

int samplingTime = 280; // 0.28ms
int deltaTime = 40;     //0.04ms
int sleepTime = 9680; // 9.68ms

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
  
}