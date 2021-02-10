import time
import machine
from machine import Pin

ledPower = Pin('P20', mode=Pin.OUT)

adc = machine.ADC(0)                # create an ADC object
dustPin = adc.channel(pin='P19')    # create an analog pin on P17

while(True):
    ledPower.value(1)
    time.sleep(0.00028)

    voMeasured = dustPin.value()    # read an analog value

    time.sleep(0.00004)
    ledPower.value(0)
    time.sleep(0.968)

    calcVoltage = voMeasured * (3.3 / 1024)
    dustDensity = 0.17 * calcVoltage - 0.01


    print("Raw signal value (0-1024)", voMeasured)
    print("Voltage: ", calcVoltage)
    print("Dust Density: ", dustDensity)

    #time.sleep(1)
