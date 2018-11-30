const moment = require('node-moment');

exports.consolaLog=function(texto){
    hoy = new Date().toString();
    hoy=moment(hoy).format('DD/MM/YYYY hh:mm:ss');
    console.log(hoy);
    console.log(texto);    
}
