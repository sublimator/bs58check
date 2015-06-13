'use strict';

var createHash = require('create-hash')
var addresses = require('coin-address-codec')

function toBuffer(buf) {
  return Buffer.isBuffer(buf) ? buf : new Buffer(buf)
}

function sha256(array) {
  return createHash('sha256').update(toBuffer(array)).digest()
}

var api = addresses.apiFactory({sha256: sha256})
var codec = api.codecs.bitcoin

// Encode a buffer as a base58-check encoded string
function encode(payload) {
  return codec.encodeChecked(payload)
}

// Decode a base58-check encoded string to a buffer
function decode(string) {
  return toBuffer(codec.decodeChecked(string))
}

module.exports = {
  encode: encode,
  decode: decode
}
