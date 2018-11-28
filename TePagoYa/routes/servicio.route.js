const express = require('express');
const router = express.Router();
const servicio_controller=require('../compra/controllers/servicio.controller');


//Estado del sistema
router.get("/", function (req, res) {
    var texto="El servidor de - Te Pago Ya - está levantado y funcionando OK!";
    res.status(200).send({ message: texto });
    ConsolaLog.consolaLog(texto);
});


//Ruteo de servicios
router.post('/inscribir',servicio_controller.inscribir);
router.get('/obtenerNombre/:nombre',servicio_controller.obtenerNombre);
router.get('/obtenerId/:id',servicio_controller.obtenerId);
router.get('/obtener/',servicio_controller.obtenerTodos);
router.get('/limpiar/',servicio_controller.limpiarColecciones);

//Proceso de pagos
router.post('/procesarpago',servicio_controller.procesarPago);

module.exports=router;
 