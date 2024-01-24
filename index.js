// index.js
const express = require('express');
const cors = require('cors');
const { sql, config, connectToDatabase } = require('./connection');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;

// Define una ruta para obtener las visitas
app.get('/api/consulta/:accion', async (req, res) => {
  try {
    const accion = req.params.accion;

    // Verifica que el parámetro sea numérico antes de usarlo en la consulta
    if (isNaN(accion)) {
      return res.status(400).send('El parámetro debe ser numérico.');
    }

    // Utiliza la configuración importada
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input('accion', sql.Int, accion)
      .query('EXEC Conoceles.SP_Visistas @accion');  // Cambiado a '@accion'
    //res.json(result.recordset);
    if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
      } else {
        res.json({ Exito: 0, Mensaje: 'No se encontraron resultados', Visitas: 0 });
      }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
