const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const Log=require('./log/tools.log');
const querystring=require('querystring');
const http=require('http');
var rp = require('request-promise');
const gatewayXCateg=require('./negocio/negocio.gateway');
const negocio=require('./negocio/negocio.compra');

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

negocio.EnvioDePago(datosCompra,function(){
    Log.LogSistema("Proceso finalizado");
});
