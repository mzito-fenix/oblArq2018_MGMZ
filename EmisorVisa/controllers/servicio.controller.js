const FuncionesApoyo=require('../tools/tools.convertir');
const Controles=require('../tools/tools.control');
const ConsolaLog=require('../log/tools.consola')
const Tarjeta=require('../models/tarjeta.model');
const Calculos=require('../tools/tools.nroaprobacion');
const moment = require('node-moment');


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
        resolverResultadoTransaccion(recibido,function(error,resultadoControl){            
            nroDeAprobacion="";
            if(resultadoControl=="OK")
               nroDeAprobacion=Calculos.NroAprobacion();

            resultado={ resultado:resultadoControl, nroaprobacion:nroDeAprobacion, destino:'' };            
            res.send(resultado);
        });
    }
}

function resolverResultadoTransaccion(referenciaTarjeta, callback){    
    resolverTarjeta(referenciaTarjeta.tarnro,function(err,tarjetabd){
        var resultadocontrol=controles(referenciaTarjeta,tarjetabd);
        callback(null,resultadocontrol);
    })
}

function controles(TarjetaRecibida, TarjetaRegistrada){


        var resultado="OK";
    
        //Comparo con nro de seguridad
        if(TarjetaRecibida.tarcodseg!=TarjetaRegistrada.tarcodseg)
        {
            resultado="NO";
            ConsolaLog.LogSistema(TarjetaRecibida.tarnro + " - No coincide codigo de seguridad")            
        }        

        //Comparo con saldo
        if(TarjetaRecibida.trnmonto>TarjetaRegistrada.saldodisponible){
            resultado="NO";
            ConsolaLog.LogSistema(TarjetaRecibida.tarnro + " - Saldo insuficiente")            
        }
        
        diaDeHoy = new Date().toString();
        
    
        let fechaTarjeta=TarjetaRecibida.tarvenc.toString();
        
        diaDeHoy=moment(diaDeHoy).format('MM/DD/YYYY');
        fechaTarjeta=moment(fechaTarjeta).format('MM/DD/YYYY');

        if(diaDeHoy.Date>=fechaTarjeta.Date){
            resultado="NO";
            ConsolaLog.LogSistema(TarjetaRecibida.tarnro + " - Tarjeta Vencida")            
        }

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

