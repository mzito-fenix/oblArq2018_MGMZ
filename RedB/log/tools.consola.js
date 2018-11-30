
var fs = require('fs') 
const moment = require('node-moment');


exports.consolaLog=function(texto){
    console.log(texto);
    
    hoy = new Date().toString();
    hoy=moment(hoy).format('DD/MM/YYYY');
    texto=hoy + "-> " + texto + "\r\n";

    fs.appendFile('./log/RedB.log', texto, function (err) { 
        if (err) return console.log(err);         
    }); 


}