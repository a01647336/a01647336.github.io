import http from 'http';
const API_KEY = "7a55413e2c5a44c2bc463d88c6e79aa8";

let favoritos = [];

// 🚀 Servidor
const server = http.createServer((req, res) => {

  if (req.method === "POST" && req.url === "/favoritos") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const data = JSON.parse(body);
      favoritos.push(data);

      console.log("Guardado:", data);

      res.end("OK");
    });
  }

  else if (req.method === "GET" && req.url === "/favoritos") {
    res.end(JSON.stringify(favoritos));
  }

  else {
    res.end("Ruta no encontrada");
  }

});

server.listen(2000, async () => {
  console.log("Servidor en http://localhost:2000");

  // 🔥 CLIENTE (se ejecuta cuando el server ya está listo)

  // GET API fútbol
  const res = await fetch("https://api.football-data.org/v4/matches", {
    headers: { "X-Auth-Token": API_KEY }
  });

  const data = await res.json();

  const partido = {
    local: data.matches?.[0]?.homeTeam?.name || "Equipo A",
    visitante: data.matches?.[0]?.awayTeam?.name || "Equipo B"
  };

  console.log("GET:", partido);

  // POST a tu servidor
  await fetch("http://localhost:2000/favoritos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(partido)
  });

  console.log("POST enviado");

  // GET para verificar
  const res2 = await fetch("http://localhost:2000/favoritos");
  const favs = await res2.json();

  console.log("GET favoritos:", favs);
});

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