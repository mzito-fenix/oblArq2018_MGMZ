const querystring=require('querystring');
const Servicio=require('../models/servicio.model');
const Herramientas=require('../models/tools.model');
const AjustesDeDatos=require('../../tools/tools.convertir')
const Controles=require('../negocio/negocio.control');
const ApoyoCompra=require('../negocio/negocio.apoyocompra');
const ConsolaLog=require('../../tools/tools.consola')
const http=require('http');
var rp = require('request-promise');

exports.inscribir=function(req,res){
    let servicio = new Servicio(
        {
            nombre: req.body.nombre,
            servidor:req.body.servidor,
            puerto:req.body.puerto
        });
        servicio.save(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).send("Servicio creado exitosamente.");
        });

        }


    exports.obtenerTodos = function(req, res) {            
        var query = {  };

        Servicio.find(query,(err,servicio) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición'});
            if(!servicio) res.status(404).send({message: 'El servicio buscado no se encuentra'});
            res.status(200).send({servicio})
        });
    }

   
    exports.obtenerId = function(req, res) {            
        let servicioId=req.params.id;
        Servicio.findById(servicioId,(err,servicio) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición'});
            if(!servicio) res.status(404).send({message: 'El servicio buscado no se encuentra'});
            res.status(200).send({servicio})
        });

        }

    exports.obtenerNombre = function(req, res) {    
        let nombre=req.params.nombre;
        var query = { nombre: nombre };

        Servicio.find(query,(err,servicio) => {
            if(err) return res.status(500).send({message: 'Error al realizar la petición'});
            if(!servicio) res.status(404).send({message: 'El servicio buscado no se encuentra'});
            res.status(200).send({servicio})
        });
    }

    exports.limpiarColecciones = function(req, res) {    
        ConsolaLog.consolaLog("Limpiando colecciones");
        Herramientas.limpiarSchema("servicios");
    }

    
    exports.procesarPago = function(req, res) {   
        ConsolaLog.consolaLog("**********************************************************************");
        ConsolaLog.consolaLog("Solicitud recibida en Te Pago Ya -> Comienzo de proceso de pago");
        let cuerpo=req.body;
        let resultadoControl=Controles.ControlDatosRecibidos(cuerpo);

        resultadoControl="";
        let resultado="";
        if(resultadoControl.length>0){
           ConsolaLog.consolaLog("Se encontraron errores: " + resultadoControl);
           res.status(500).send({mensaje: 'Se encontraron errores: '+ resultadoControl });           
           res.send(resultado);        
          }
        else{
            cuerpo=AjustesDeDatos.AjustesPorServicio(cuerpo,cuerpo.destino);
            
            //--> si está todo OK
            ConsolaLog.consolaLog("Todos los controles OK, se continua con el proceso...");
            var resultado1=procesoDePago(cuerpo,function(err,respuesta){
                res.send(respuesta);
            });
        }
        ConsolaLog.consolaLog("Se espera próxima petición");
        ConsolaLog.consolaLog("**********************************************************************");
    }
    
    function procesoDePago(datosCompra,callback){
        console.log(datosCompra);
        ConsolaLog.consolaLog("Voy a consultar a =>" + datosCompra.destino);
        ApoyoCompra.resolverDestino(datosCompra.destino,function(error,destino){

            //------ Llamada al nuevo destino
            rp({
                method: 'POST',
                uri: 'http://' + destino.servidor + ':' + destino.puerto + '/servicios/procesarpago',
                body: datosCompra,
                json: true // Automatically stringifies the body to JSON
            }).then(function (parsedBody) {
                    
                    var respuesta=parsedBody;
                    var proxdestino=respuesta.destino;
                    var largo=proxdestino.length;
                    if(largo>0){
                        resultado=procesoDePago(respuesta,callback);
                    }
                    else{
                        resultado=respuesta;
                        console.log(resultado);
                        callback(null,resultado);
                    }
                })
                .catch(function (err) {
                    ConsolaLog.consolaLog(err);
                });
            //------------------------------
        });
    }
  
