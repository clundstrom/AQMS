function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  
  var t;
  var h;
  var p;
  var d;

    t = (bytes[0] & 0x80 ? 0xFFFF<<16 : 0) | bytes[0]<<8 | bytes[1];
    h = bytes[2];
    p = bytes[3] << 16 | bytes[4] << 8 | bytes[5];
    d = bytes[6] << 8 | bytes[7]; 
  
    return {
      temperature: t / 10,
      humidity: h,
      pressure: p/100,
      dustDensity: d
    }
    
}