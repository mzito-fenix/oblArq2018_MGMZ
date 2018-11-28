const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PagoSchema=new Schema({
    nombre:{type: String, required:true, max: 50},
    uri:{type: String, required:true, max: 500},
    
});

 module.exports=mongoose.model('pagos',PagoSchema);