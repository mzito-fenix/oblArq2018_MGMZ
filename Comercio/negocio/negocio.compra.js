const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const Log=require('../log/tools.log');
const querystring=require('querystring');
const http=require('http');
var rp = require('request-promise');


exports.EnvioDePago=function (datosCompra,callback)
{
    console.log(datosCompra);
    Log.LogSistema("Se va a enviar la solicitud de pago de la compra")
    //------ Llamada al nuevo destino
    rp({
        method: 'POST',
        uri: 'http://localhost:3000/servicios/procesarpago',
        body: datosCompra,
        json: true // Automatically stringifies the body to JSON
    }).then(function (parsedBody) {            
            var respuesta=parsedBody;
            resultadoTransaccion="Resultado:" + respuesta.resultado + " Nro de aprob.: " + respuesta.nroaprobacion;
            Log.LogSistema(resultadoTransaccion);      
            console.log(resultadoTransaccion);
            callback(resultadoTransaccion);          
        })
        .catch(function (err) {
            Log.LogError("FATAL",err);
        });
    //------------------------------
    
}