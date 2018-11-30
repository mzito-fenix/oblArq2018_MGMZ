var log4js = require('log4js');
var logger = log4js.getLogger();
const moment = require('node-moment');
var fs = require('fs');


log4js.configure({
    appenders: { comercio: { type: 'file', filename: './log/Comercio_Errores.log' } },
    categories: { default: { appenders: ['comercio'], level: 'error' } }
  });

exports.LogError=function(tipo, texto){
    const logger = log4js.getLogger('comercio');
    if(tipo=="ERROR")
      logger.error(texto);
    if(tipo=="FATAL")
      logger.error(texto);
}

exports.LogSistema= function(texto) {
    hoy = new Date().toString();
    hoy=moment(hoy).format('DD/MM/YYYY hh:mm:ss');
    texto=hoy + "-> " + texto;
    texto+= "\r\n";    
    fs.appendFile('./log/Comercio_Registro.log', texto, function (err) { 
        if (err) return LogError("FATAL",err);        
    }); 

}