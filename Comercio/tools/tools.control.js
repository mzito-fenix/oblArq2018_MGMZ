const moment = require('node-moment');
const ConsolaLog=require('./tools.consola');

exports.ControlDatosRecibidos=function (fuente)
{
    ConsolaLog.consolaLog("Iniciando controles a datos recibidos del comercio");
    //Función para controlar si todo lo recibido está OK
    let resultadoControl="";

    return resultadoControl;
}


function convertirAJson (Cadena){
    return JSON.stringify(Cadena,null,'\t');
}

function referenciaExiste(ReferenciaTarjeta)
{
    return ExisteReferencia(ReferenciaTarjeta);
}