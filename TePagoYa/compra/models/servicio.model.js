const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServicioSchema=new Schema({
    nombre:{type: String, required:true, max: 50},
    servidor:{type: String, required:true, max: 100},
    puerto:{type: String, required:true, max: 100}
});
 module.exports=mongoose.model('servicios',ServicioSchema);