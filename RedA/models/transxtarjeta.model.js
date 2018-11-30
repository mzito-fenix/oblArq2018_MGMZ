const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransXTarjetaSchema=new Schema({
    transtarjeta: String,
    transfecha: Date,
});
 module.exports=mongoose.model('transxtarjeta',TransXTarjetaSchema);