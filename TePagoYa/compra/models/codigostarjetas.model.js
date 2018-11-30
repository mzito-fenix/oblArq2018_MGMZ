const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReferenciaTarjetaSchema=new Schema({
    nombre:{type: String, required:true, max: 50},
    referencia:{type: String, required:true, max: 500},
});
 module.exports=mongoose.model('codigostarjetas',ReferenciaTarjetaSchema);