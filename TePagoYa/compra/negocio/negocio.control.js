const moment = require('node-moment');
const referenciaTarjetas=require('../controllers/referenciatarjeta.controller');
const ConsolaLog=require('../../tools/tools.consola');

exports.ControlDatosRecibidos=function (fuente)
{
    ConsolaLog.consolaLog("Iniciando controles a datos recibidos del comercio");
    //Función para controlar si todo lo recibido está OK
    let resultadoControl="";

    //resultadoControl="Fecha Inválida";
    
    //cadena.substr(inicio[, longitud])

    //El nro de tarjeta es valido, controlando contra la colección de tarjetas validas
    tarnro=fuente.tarnro;
    referencia=tarnro.substr(0,4);    
    //ConsolaLog.consolaLog("Existe referencia? " + referencia);

    if(referenciaTarjetas.ExisteReferencia(referencia)==false)
    {
        resultadoControl+="El código de tarjeta no es válido:"+referencia;    
    }
    //--------------------------------------------------------------------------------    
    return resultadoControl;
}


function convertirAJson (Cadena){
    return JSON.stringify(Cadena,null,'\t');
}

function referenciaExiste(ReferenciaTarjeta)
{
    return ExisteReferencia(ReferenciaTarjeta);
}