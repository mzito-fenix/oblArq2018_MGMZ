
exports.GatewayXCategoria=function (categoria,gateway)
{
    //Debe levantar un archivo de configuración con la relación entre categorias y gateway antes del envio
    //Atributo de calidad fortalecido - Modificabilidad
    let resultado="";
    
    if(categoria=="Ropa")
       resultado="GatewayA";

    if(categoria=="Zapatos")
       resultado="GatewayB";

    return resultado;
}
