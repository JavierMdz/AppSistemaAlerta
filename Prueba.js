const express = require('express');
const router = express.Router();
//const  pool = require('./dbconector');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'alertasbd',
    port:3307
});

const str="3,4,650";

async function main(DataList){
    try{

        const value1 = DataList[0];
        const value2 = DataList[1];
        const value3 = DataList[2];
        
        const sqlQuery = 'INSERT INTO customers(name,address) VALUES (?,?)';
     await pool.query(sqlQuery, [value1, value2]);
     console.log('data inserted');
/*         
        let conn =  await pool.getConnection();
        let rows =  await conn.query("INSERT INTO customers (name,address) VALUES ('COCA COLA','NOSEE')");
        console.log('data inserted'); */

    }catch(e){
        console.log(e);
    }
}

function myfunction(){
DataList = str.split(',');
main(DataList);
}

myfunction();
