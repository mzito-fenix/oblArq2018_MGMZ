const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransXTarjetaSchema=new Schema({
    transtarjeta: String,
    fecha: Date,
});
 module.exports=mongoose.model('transxtarjeta',TransXTarjetaSchema);