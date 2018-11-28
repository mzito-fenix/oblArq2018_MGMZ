const Emisorxcodigo=require('../models/emisorxcodigo.model');
const FuncionesApoyo=require('../tools/tools.convertir');
const Controles=require('../tools/tools.control');
const ConsolaLog=require('../tools/tools.consola')



exports.procesarPago = function(req, res) {   
    ConsolaLog.consolaLog("**********************************************************************");
    ConsolaLog.consolaLog("Comienzo de proceso de pago en Red A");

    let resultadoControl=Controles.ControlDatosRecibidos(req.body);
    let resultado="";

    if(resultadoControl.length>0){
       ConsolaLog.consolaLog("Se encontraron errores: " + resultadoControl);
       res.status(500).send({mensaje: 'Se encontraron errores: '+ resultadoControl });           
       res.send(resultado);        
      }
    else{
        //--> si está todo OK
        ConsolaLog.consolaLog("Todos los controles OK, se continua con el proceso...");
        var recibido=req.body;
        //------ Ajustes 
        var TarjetaNro=recibido.tarnro;
        var referenciaTarjeta=TarjetaNro.substr(0,4);
        console.log(referenciaTarjeta);
        resolverDestino(referenciaTarjeta,function(error,destino){
            //Se deben ajustar cosas    
            recibido.destino=destino.emisor;
            
            //---------------------------

            ConsolaLog.consolaLog("** Llegaron noticias...");
            ConsolaLog.consolaLog(recibido);    
            ConsolaLog.consolaLog("Se espera próxima petición");
            ConsolaLog.consolaLog("**********************************************************************");    
            res.send(recibido);
        });
    }
}

function resolverDestino(referenciaTarjeta, callback){    
    //Recibe el nombre del servicio y resuelve en la base de datos    
    Emisorxcodigo.findOne({ referencia: referenciaTarjeta },function(err,emisorxcodigo) {            
        if(err) {            
            callback(err.message,null);                        
        } else if(!emisorxcodigo) {
            callback(null,'No se encuentra la referencia de la tarjeta');
        } else {
            callback(null,emisorxcodigo);
        }
    });
}