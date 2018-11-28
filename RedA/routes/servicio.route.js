const express = require('express');
const router = express.Router();
const servicio_controller=require('../controllers/servicio.controller');
const ConsolaLog=require('../tools/tools.consola');


//Estado del sistema
router.get("/", function (req, res) {
    var texto="El servidor de - Red A - está levantado y funcionando OK!";
    res.status(200).send({ message: texto });
    ConsolaLog.consolaLog(texto);
});


//Proceso de pagos
router.post('/procesarpago',servicio_controller.procesarPago);

module.exports=router;
 