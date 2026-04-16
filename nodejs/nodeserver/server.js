import http from 'http';

const servidor = http.createServer(async (req, res) => {
  console.log('Solicitud recibida');

  if (req.url === '/artist') {
    try {
      const respuesta = await fetch('https://www.theaudiodb.com/api/v1/json/123/search.php?s=maluma');
      const datos = await respuesta.json();

      // Mandar JSON al cliente
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(datos));

    } catch (error) {
      res.writeHead(500);
      res.end('Error en el servidor');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

const puerto = 2000;

servidor.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`);
});