import http from 'http';
import 'dotenv/config';

const API_KEY = process.env.FOOTBALL_API_KEY || '';

let favoritos = [];

const server = http.createServer(async (req, res) => {

  // =========================
  // POST /favoritos
  // =========================
  if (req.method === "POST" && req.url === "/favoritos") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      try {

        const data = JSON.parse(body);

        favoritos.push(data);

        console.log("Guardado:", data);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          mensaje: "Favorito guardado"
        }));

      } catch (error) {

        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          error: "JSON inválido"
        }));
      }
    });
  }

  // =========================
  // GET /favoritos
  // =========================
  else if (req.method === "GET" && req.url === "/favoritos") {

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(favoritos));
  }

  // =========================
  // GET /artist
  // =========================
  else if (req.method === "GET" && req.url === "/artist") {

    try {

      const respuesta = await fetch(
        'https://www.theaudiodb.com/api/v1/json/2/search.php?s=maluma'
      );

      const datos = await respuesta.json();

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify(datos));

    } catch (error) {

      res.writeHead(500, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify({
        error: 'Error en el servidor'
      }));
    }
  }

  // =========================
  // Ruta no encontrada
  // =========================
  else {

    res.writeHead(404, {
      "Content-Type": "text/plain"
    });

    res.end("Ruta no encontrada");
  }
});

// =========================
// INICIAR SERVIDOR
// =========================
server.listen(2001, async () => {

  console.log("Servidor en http://localhost:2001");

  try {

    // GET API fútbol
    const respuesta = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": API_KEY
        }
      }
    );

    const data = await respuesta.json();

    const partido = {
      local: data.matches?.[0]?.homeTeam?.name || "Equipo A",
      visitante: data.matches?.[0]?.awayTeam?.name || "Equipo B"
    };

    console.log("GET fútbol:", partido);

    // POST a favoritos
    await fetch("http://localhost:2001/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(partido)
    });

    console.log("POST enviado");

    // GET favoritos
    const res2 = await fetch("http://localhost:2001/favoritos");

    const favs = await res2.json();

    console.log("GET favoritos:", favs);

  } catch (error) {

    console.error("Error:", error);
  }
});