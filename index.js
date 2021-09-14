require('dotenv').config();  

//Express Server Variables
const mariadb = require('mariadb');
const express = require('express'); 
const app = express();

//DB
const pool = mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'alertasbd',
    port:3307
});

//SSID y token para Twilio (Modificar en archivo .env por si cambian las credenciales de twilio )
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

//Twilio functions
const client = require('twilio')(accountSid, authToken);
const messagingResponse = require('twilio').twiml.MessagingResponse;

//Instancias
app.use(express.urlencoded({ extended: true })); // <-- NO BORRAR ESTO

//METODO PRINCIPAL
app.post('/sms',(req,res)=>{
    const twiml = new messagingResponse();
   // twiml.message('Mensaje Recibido :)!'); <-- Esta parte es para el response automatico
    
        const str=req.body.Body;
        DataList = str.split(',');//Se obtienen los datos y se separan por cada ","
        writeOnDBFunction(DataList);

    res.writeHead(200,{'Content-Type':'text/xml'});
    res.end(twiml.toString());
});

app.listen(4000, ()=> {
    console.log('Server on port 4000');
});

async function writeOnDBFunction(DataList){
    try{
        const agenteValue = DataList[0];
        const sectorValue = DataList[1];
        const Value = DataList[2];
    
        const sqlQuery = 'INSERT INTO registros(id_agente,id_sector,valor) VALUES (?,?,?)';
        await pool.query(sqlQuery, [agenteValue, sectorValue,Value]);

        console.log('Mensaje Almacenado en la BD');
    }catch(e){
        console.log(e);
    }
}
