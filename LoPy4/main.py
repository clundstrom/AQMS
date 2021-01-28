from network import LoRa
import time
import ubinascii
import socket
import pycom

import keys

# Initialise LoRa in LORAWAN mode.
# Please pick the region that matches where you are using the device:
# Europe = LoRa.EU868
lora = LoRa(mode=LoRa.LORAWAN, region=LoRa.EU868)

app_eui = ubinascii.unhexlify(keys.APP_EUI)
app_key = ubinascii.unhexlify(keys.APP_KEY)
#lora.join(activation=LoRa.OTAA, auth=(app_eui, app_key), timeout=0)

# wait until the module has joined the network
while not lora.has_joined():
    time.sleep(2.5)
    print('Not joined yet...')

print('Network joined!')

# create socket to be used for LoRa communication
s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
# configure data rate
s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)
# make the socket blocking
# (waits for the data to be sent and for the 2 receive windows to expire)
s.setblocking(True)

#define which port with the socket bind
s.bind(2)

#send some data
s.send(bytes([0x01,0x02,0x03]))

s.setblocking(False)
# get any data received...
data = s.recv(64)
print(data)


