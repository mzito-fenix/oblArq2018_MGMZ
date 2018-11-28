const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TarjetaSchema=new Schema({
    tarnro: String,
    tarcodseg: String,
    tarvenc: Date,
    saldodisponible: Number
});
 module.exports=mongoose.model('tarjetas',TarjetaSchema);