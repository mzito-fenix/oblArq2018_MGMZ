const ReferenciaTarjetas=require('../models/codigostarjetas.model');
const Herramientas=require('../models/tools.model');
const ConsolaLog=require('../../tools/tools.consola');

exports.ExisteReferencia = function(referenciaAControlar) {    
    let resultado=true;
    
    //TODO -> HAY 
    //var query = { referencia: referenciaAControlar };
    //ConsolaLog.consolaLog(query);
    //ReferenciaTarjetas.find(query,(err,referenciatarjeta) => {
    //    if(err) return console.log("Problema");
    //    ConsolaLog.consolaLog("Dentro del find de tarjetas");
    //   if(!referenciatarjeta) resultado=false;        
    //});
    //ConsolaLog.consolaLog(resultado);

    return resultado;
}
