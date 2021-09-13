require('dotenv').config();  
 //Esta libreria es necesaria para el uso de las credenciales de twilio
 //Habilitar la conexion con Mariadb

//Express Server Variables
const mariadb = require('mariadb');
const express = require('express'); 
const app = express();
const router = express.Router();

//DB
const pool = mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'alertasbd',
    port:3307
});

//Instancias de  las apps
app.use(express.urlencoded({ extended: true })); // <-- NO BORRAR ESTO

//SSID y token para Twilio (Modificar en archivo .env)
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

//Twilio functions
const client = require('twilio')(accountSid, authToken);
const messagingResponse = require('twilio').twiml.MessagingResponse;

//Outbound messaging function
/*
client.messages.create({
    to: '+526692474283',
    from: '+12107672408',
    body: 'Holaaaaaaaa'
})v  
    .then(message => console.log(message.sid));
*/

//METODO PRINCIPAL
app.post('/sms',(req,res)=>{
    const twiml = new messagingResponse();
    
    //twiml.message('Mensaje Recibido :)!');

    console.log('Me llego un mensaje');
    
      /*console.log(req.body.From);
        console.log(req.body.Body);
        console.log(req.body.To);
         */

        const str=req.body.Body;
        DataList = str.split(',');
        main(DataList);
  
    res.writeHead(200,{'Content-Type':'text/xml'});
    res.end(twiml.toString());
});

app.listen(4000, ()=> {
    console.log('Server on port 4000');
});

async function main(DataList){
    try{
        const value1 = DataList[0];
        const value2 = DataList[1];
        const value3 = DataList[2];
    
        const sqlQuery = 'INSERT INTO registros(id_agente,id_sector,valor) VALUES (?,?,?)';
        await pool.query(sqlQuery, [value1, value2,value3]);
        /*    
        let conn =  await pool.getConnection();
        let rows =  await conn.query("INSERT INTO customers (name,address) VALUES ('COCA COLA','NOSEE')");
        console.log('data inserted'); */
        console.log('Mensaje Enviado');
    }catch(e){
        console.log(e);
    }
}
