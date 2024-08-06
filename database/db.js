const mysql=require('mysql');

const conectar= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'examen'
})


conectar.connect((Error)=>{
    if(Error)
    { console.log('Error de Conexion',Error)
    return}
    else {
        console.log('Conectado a la Base de Datos')
    }
    })

    module.exports=conectar;