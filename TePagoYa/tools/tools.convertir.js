const ConsolaLog=require('../tools/tools.consola');
const moment = require('node-moment');

exports.AjustesPorServicio=function (fuente,conjuntocambios)
{
    //Aqui se debe buscar todos los cambios que requiere el nombre del servicio

    nuevores=fuente;

    //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/JSON/stringify
    
    
    //Como cambiar datos tipo String
    //nuevores.tarnomtit="Franco Zito";
    //--------------------------------

    //Como cambiar formatos de fecha?
    //nuevores.trnfecha=moment('11/20/2018').toISOString();

    ConsolaLog.consolaLog("Proceso de ajuste de datos de acuerdo al suscriptor:")
    nuevores.tarnomtit="Edinson Cavani";
    
    return nuevores;
}


function convertirAJson (Cadena){
    return JSON.stringify(Cadena,null,'\t');
}

