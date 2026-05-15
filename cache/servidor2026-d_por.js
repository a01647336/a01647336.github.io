import express from 'express';
import 'dotenv/config';
import { get } from 'http';
import mysql from 'mysql2';
//Pendiente nombre de la librería
import NodeCache from 'node-cache';

import path from 'path';
import { fileURLToPath } from 'url';


//stdTTL
const myCache = new NodeCache({ stdTTL:  2026}); // el cache tendrá una duración de 2026 segundos (aproximadamente 33.77 minutos)

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();


//Completa los datos correctos
const connection = mysql.createConnection({
  host: 'mysql-1b336be3-tec-e448.a.aivencloud.com',
  port: 13269,
  user: process.env.AIVEN_USER,
  password: process.env.AIVEN_PASSWORD,
  database: 'defaultdb',
});


let datosDB;

// Función para obtener donantes
function getDonantes() {

  return new Promise((resolve, reject) => {

    // Nombre de la llave del caché
    const cacheKey = "misDonantes";

    // Consulta SQL
    const consultaSQL = `SELECT * FROM donantes;`;

    // Revisar caché
    const cachedDonantes = myCache.get(cacheKey);

    if (cachedDonantes) {

      console.log("Servido desde el caché");

      resolve(cachedDonantes);
      return;
    }

    console.log("Consultando base de datos");

    // Consulta MySQL
    connection.query(consultaSQL, (error, resultados) => {

      if (error) {
        reject(error);
        return;
      }

      console.log(resultados);

      // Guardar en caché
      myCache.set(cacheKey, resultados);

      // Regresar resultados
      resolve(resultados);
    });

  });
}

// Ruta HTML
app.get('/storage', (req, res) => {

  res.sendFile(path.join(__dirname, 'localStorage_por.html'));
});

// Ruta API
app.get('/obtenerDatos', async (req, res) => {

  try {

    // Esperar los datos
    const datos = await getDonantes();

    // Enviar JSON
    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(1984, () => {
  console.log('Up and up');
});