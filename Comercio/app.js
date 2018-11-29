const express=require('express');
const bodyParser = require('body-parser');
const servicio=require('./routes/servicio.route');
const mongoose = require('mongoose');
const app = express();
const ConsolaLog=require('./tools/tools.consola');
const querystring=require('querystring');
const http=require('http');
var rp = require('request-promise');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/servicios',servicio);

// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/bdcomercio';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//-----------------------------------------------------------

//EL comercio solo larga la solicitud hacia TePagoYa
let datosCompra={
    "tarnro":"1111101212341111",
    "tarvenc":"11/15/2018",
    "tarnomtit":"Luis Suárez",
    "tarcodseg":"776",
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
    "destino":"GatewayA"
 };

    //------ Llamada al nuevo destino
    rp({
        method: 'POST',
        uri: 'http://localhost:3000/servicios/procesarpago',
        body: datosCompra,
        json: true // Automatically stringifies the body to JSON
    }).then(function (parsedBody) {
            
            var respuesta=parsedBody;
            var proxdestino=respuesta.destino;
            var largo=proxdestino.length;
            if(largo>0){
                resultado=respuesta;
                console.log(resultado);
            }
            else{
                resultado=respuesta;
                console.log(resultado);     
            }
        })
        .catch(function (err) {
            LogSistema.LogError("FATAL",err);
        });
    //------------------------------
