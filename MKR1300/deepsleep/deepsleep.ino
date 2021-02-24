#include "ArduinoLowPower.h"

void setup() {
  pinMode(1, OUTPUT);
  //LowPower.attachInterruptWakeup(RTC_ALARM_WAKEUP, dummy, CHANGE);
}

void loop() {
  digitalWrite(1, LOW); // Turn off led
  delay(500);
  LowPower.sleep(10000); // Sleep for 10s
  digitalWrite(1, HIGH); // Turn on led for 2 seconds
  delay(10000);
}

void dummy() {
  digitalWrite(1, HIGH); // Turn on led for 2 seconds
  delay(2000);
}
