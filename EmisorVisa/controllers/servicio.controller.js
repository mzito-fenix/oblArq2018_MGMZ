const FuncionesApoyo=require('../tools/tools.convertir');
const Controles=require('../tools/tools.control');
const ConsolaLog=require('../tools/tools.consola')
const Tarjeta=require('../models/tarjeta.model');



exports.procesarPago = function(req, res) {   
    ConsolaLog.consolaLog("**********************************************************************");
    ConsolaLog.consolaLog("Comienzo de proceso de pago en Emisor A");

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
        resolverResultadoTransaccion(recibido,function(error,resultado){            

            //Resultado temporal
            resultado={ resultado:"OK", destino:'' };            
            res.send(resultado);
        });
    }
}

function resolverResultadoTransaccion(referenciaTarjeta, callback){    
    //Resolver aqui si la tarjeta tiene credito y si puede hacer la compra
    //Busco tarjeta
    resolverTarjeta(referenciaTarjeta.tarnro,function(err,tarjetabd){
        console.log("**********************************************")
        console.log(referenciaTarjeta);
        console.log("****************DATOS ENCONTRADOS*************")
        console.log(tarjetabd);
        console.log("**********************************************")

        var resultadocontrol=controles(referenciaTarjeta,tarjetabd);

        console.log(resultadocontrol);
        
        callback(null,resultadocontrol);
    })
}

function controles(TarjetaRecibida, TarjetaRegistrada){


        var resultado="OK";
    
        //Comparo con nro de seguridad
        //Comparo con saldo
        //Comparo
    
    
        return resultado;
}


function resolverTarjeta(NroDeTarjeta, callback){    
    Tarjeta.findOne({ tarnro: NroDeTarjeta },function(err,tarjeta) {            
        if(err) {            
            callback(err.message,null);                        
        } else if(!tarjeta) {
            callback(null,'No se encuentra la referencia de la tarjeta');
        } else {
            callback(null,tarjeta);
        }
    });
}