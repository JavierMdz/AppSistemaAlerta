const express = require('express');
const router = express.Router();
const DBConnector = require('./dbconector');


router.post('/register', async function(req,res) {
    try {
        const value1 = DataList[0];
        const value2 = DataList[1];
        const value3 = DataList[2];
        
        const sqlQuery = 'INSERT INTO registros (id_agente, id_sector, valor) VALUES (?,?,?)';
        await DBConnector.query(sqlQuery, [value1, value2,value3]);
        
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;