const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RedxcodigoSchema=new Schema({
    referencia: String,
    red: String,
});
 module.exports=mongoose.model('redxcodigo',RedxcodigoSchema);


 