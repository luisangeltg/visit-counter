// connection.js
const sql = require('mssql');
require('dotenv').config();
const config = {
  user: 'Pruebas',
  password: 'JsH_d63$jAif(yg193j4',
  server: '192.168.50.12\\SQL2019DEV',
  database: 'SIET',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Define una función asíncrona para la conexión
async function connectToDatabase() {
  try {
    let pool = await sql.connect(config);
    console.log("Conexión exitosa");
  } catch (error) {
    console.log("Error:", error);
  }
}

// Exporta el módulo sql y la configuración
module.exports = { sql, config, connectToDatabase };
