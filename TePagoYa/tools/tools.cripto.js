var crypto    = require('crypto');

exports.tohash=function(dato){    
var text      = dato;
var secret    = 'Arq2018MGMZ'; //make this your secret!!
var algorithm = 'sha1';   //consider using sha256
var hash, hmac;

// Method 1 - Writing to a stream
hmac = crypto.createHmac(algorithm, secret);    
hmac.write(text); // write in to the stream
hmac.end();       // can't read from the stream until you call end()
hash = hmac.read().toString('hex');    // read out hmac digest

return hash;
}