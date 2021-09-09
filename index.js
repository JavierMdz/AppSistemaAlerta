require('dotenv').config();

const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

//Express Server Variables

const express = require('express');
const app = express();

//SSID y token para Twilio (Modificar en archivo .env)
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

//Twilio functions
const client = require('twilio')(accountSid, authToken);
const messagingResponse = require('twilio').twiml.MessagingResponse;

//Outbound messaging function

client.messages.create({
    to: '+526692474283',
    from: '+12107672408',
    body: 'Holaaaaaaaa'
})
    .then(message => console.log(message.sid));

//Automatic response

app.post('/sms',(req,res)=>{
    const twiml = new messagingResponse();
    twiml.message('Mensaje Recibido :)!');
    res.writeHead(200,{'Content-Type':'text/xml'});
    res.end(twiml.toString());

});

app.listen(400, ()=> {
    console.log('Server on port 5000?');
});
