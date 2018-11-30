const express=require('express');
const bodyParser = require('body-parser');
const servicio=require('./routes/servicio.route');
const mongoose = require('mongoose');
const app = express();
const ConsolaLog=require('./log/tools.consola');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/servicios',servicio);

// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/bdreda';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//-----------------------------------------------------------

let port=3201;
app.listen(port,() => {
    ConsolaLog.consolaLog('El servidor RED A está corriendo en el puerto= ' + port);
})
