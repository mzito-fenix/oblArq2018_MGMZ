const AjustesXCliente=require('./negocio.control');

exports.conjuntoAjustesXCliente(nombreServicio, callback)
{  

        //Recibe el nombre del servicio y resuelve en la base de datos los cambios que se deben hacer por suscriptor

        //Servicio.findOne({ nombre: nombreServicio },function(err,servicio) {            
        //    if(err) {            
        //        callback(err.message,null);                        
        //    } else if(!servicio) {
        //        callback(null,'No se encuentra el servicio');
        //    } else {
        //        callback(null,servicio);
        //    }
        //});
        resultado={};
        callback(err,resultado);
  }