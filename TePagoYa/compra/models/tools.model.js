const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.limpiarSchema = function(nombre) {            
        // Set up mongoose connection
        let dev_db_url = 'mongodb://localhost:27017/bdtepagoya';
        let mongoDB = process.env.MONGODB_URI || dev_db_url;
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;        
        db.dropCollection(nombre);
}

 