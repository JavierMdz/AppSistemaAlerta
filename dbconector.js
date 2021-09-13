const mariadb = require('mariadb');

const  DBConnector= mariadb.createPool({  //Configuracion principal del servidor, aqui es donde deben de ir los cambios
    host:'MyDb',
    user:'root',
    password:'root',
    database:'alertasbd', 
    port:3307,
    connectionLimit:5,
});

// Connexiones y erroress
 DBConnector.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
}); 


module.exports = DBConnector;