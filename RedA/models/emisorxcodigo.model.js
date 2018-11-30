const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmisorxcodigoSchema=new Schema({
    referencia: String,
    emisor: String,
});
 module.exports=mongoose.model('emisorxcodigo',EmisorxcodigoSchema);