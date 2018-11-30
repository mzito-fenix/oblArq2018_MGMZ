const Servicio=require('../models/servicio.model');

exports.resolverDestino=function (nombreServicio, callback){    
    //Recibe el nombre del servicio y resuelve en la base de datos    
    Servicio.findOne({ nombre: nombreServicio },function(err,servicio) {            
        if(err) {            
            callback(err.message,null);                        
        } else if(!servicio) {
            callback(null,'No se encuentra el servicio');
        } else {
            callback(null,servicio);
        }
    });
}

