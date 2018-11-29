const ConsolaLog=require('../tools/tools.consola')
const TransXTarjeta=require('../models/transxtarjeta.model');
const Cripto=require('../tools/tools.cripto');
const moment = require('node-moment');


exports.registrarTransaccion = function(tarjeta, callback) { 
    let tarjetahash=Cripto.tohash(tarjeta);
    let ahora = new Date().toString();
    ahora=moment(ahora).format('MM/DD/YYYY hh:mm:ss');
    console.log("Estoy dentro del registro");
    let transxtarjeta = new TransXTarjeta(
        {
            transtarjeta: tarjetahash,
            transfecha: ahora,
        });
        transxtarjeta.save(function(err) {
            if (err) {
                ConsolaLog.consolaLog(err);
            }
            callback("OK");
        });

    }

    function obtenerMovsXTarjeta (tarjeta, callback) { 
        console.log("buscando movimientos por tarjeta" + tarjeta)
        let tarjetahash=Cripto.tohash(tarjeta);
        let ahora = new Date();
        limite=moment(ahora).add(-3,'days').toISOString();
        var query={ transfecha: {$gt:limite} };        
        TransXTarjeta.countDocuments(query).exec((err, count) =>{
            callback(count);
        });
    }

    exports.AlertaFraude= function(tarjeta, callback) {
        console.log("antes de consultar los movs por registro");
        obtenerMovsXTarjeta(tarjeta,function(cant){
            console.log(cant);
            callback(cant);    
        });
    };
