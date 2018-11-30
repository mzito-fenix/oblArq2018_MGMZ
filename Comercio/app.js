const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const Log=require('./log/tools.log');
const querystring=require('querystring');
const http=require('http');
var rp = require('request-promise');
const gatewayXCateg=require('./negocio/negocio.gateway');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
//app.use('/servicios',servicio);

//EL comercio solo larga la solicitud hacia TePagoYa
let datosCompra={
    "tarnro":"1111101212341111",
    "tarvenc":"11/15/2018",
    "tarnomtit":"Luis Suárez",
    "tarcodseg":"775",
    "direnvcalle":"Passei del Toulat",
    "direnvnro":"2923",
    "direnvciudad":"Barcelona",
    "direnvpais":"España",
    "direnvcp":"123452",
    "dirfaccalle":"Passei del Toulat",
    "dirfacnro":"2923",
    "dirfacciudad":"Barcelona",
    "dirfacpais":"España",
    "dirfaccp":"123452",
    "trnmonto":"400",
    "trnfecha":"20/11/2018",
    "prdcant":"5",
    "prdnombre":"Botines de Fútbol",
    "prdcategoria":"Ropa",
    "destino":""
 };
 
//Se resuelve el gateway destino desde la categoria del producto
gatewayDestino=gatewayXCateg.GatewayXCategoria(datosCompra.prdcategoria);
datosCompra.destino=gatewayDestino;
//------------------------------------------------------

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
        })
        .catch(function (err) {
            Log.LogError("FATAL",err);
        });
    //------------------------------
    