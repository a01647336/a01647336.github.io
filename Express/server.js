import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: 'mysql-1b336be3-tec-e448.a.aivencloud.com',
  port: 13269,
  user: process.env.AIVEN_USER,
  password: process.env.AIVEN_PASSWORD,
  database: 'defaultdb',

  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to Aiven:', error);
    return;
  }
  console.log('Conectada a Aiven');
});

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;

connection.query(consultaSQL, (error, resultados) => {
  if (error) throw error;

  console.log('Donante insertado');
  console.log(resultados);

  connection.end();
});




