
const moment = require('node-moment');

exports.AjustesPorServicio=function (fuente,nombreServicio)
{
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/JSON/stringify
    
    //Aqui se debe buscar todos los cambios que requiere el nombre del servicio
    nuevores=fuente;

    //Cambio de dato de prueba
    nuevores.tarnomtit="Franco Zito";
    //--------------------------------

    nuevores.trnfecha=moment('11/20/2018').toISOString();

    return nuevores;
}


function convertirAJson (Cadena){
    return JSON.stringify(Cadena,null,'\t');
}

