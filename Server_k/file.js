// el http sirve para crear un servidor web, es decir, una aplicación que puede responder a solicitudes HTTP (como las que hace un navegador web) y enviar respuestas de vuelta. Es fundamental para construir aplicaciones web y APIs en Node.js.
import http from 'http'; 
// el fs sirve para interactuar con el sistema de archivos, lo que permite leer, escribir, actualizar y eliminar archivos en el disco. Es útil para manejar archivos de configuración, almacenar datos o servir archivos estáticos en una aplicación web.
import fs from 'fs';


    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //Escribe qué significa el 500 
           // El 500 es un codigo de estado http que indica un error interno en el servidor 
          res.writeHead(500, { 'Content-Type': 'text/plain' }); 
          res.end('Oh no!!!!');
          return;
        }
        //Escribe qué significa el 200
        // el 200 es un codigo de estado http que indica que la solicitud se ha procesado correctamente y se ha enviado una respuesta exitosa al cliente.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }


    //Esta función deberá enviar un json con los datos de los usuarios
    function getUsuarios(req, res) {
        //Esto representa un objeto JSON de un usuario
        //Agrega otro usuario
        const usuarios = [
            {
                "nombre": "Punk",
                "saldo": "0"
            },
            {
                "nombre": "Guante",
                "saldo": "2"
            }
        ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      // La función stringify convierte un objeto JavaScript en una cadena JSON. La usamos porque el método res.end() espera una cadena como argumento, y no puede enviar directamente un objeto JavaScript. Al convertir el objeto a una cadena JSON, podemos enviar los datos de manera adecuada al cliente.
      res.end(JSON.stringify(usuarios)); 
    }

  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

     
      function mostrarMovimientos(req, res) {
        //Construye una página básica movimientos.html
        
        fs.readFile('movimientos.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarOpinion(req, res) {
        //Construye una página básica opinion.html
        
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarArchivos(req, res) {
        //Construye una página básica archivos.html
        
        fs.readFile('miarchivo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    //Esta función deberá enviar un json con los datos de las movimientos
    function getMovimientos(req, res) {
    //Tienes que corregir varias cosas en esta sección
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Aquí van los datos de los movimientos financieros' }));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //Cambia el mensaje por algo más divertido
      res.end('Página no encontrada. Skill Issue brother');
    }

    //incluye el enlace a la documentación de createServer
    // https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener 

    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
      } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
      } 
      else if (url === '/usuarios') {
        mostrarUsuarios(req, res);
      } 
      else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
      } 
      else if (url === '/api/equipo') {
        mostrarEquipo(req, res);
      }
      else if (url === '/api/opinion') {
        mostrarOpinion(req, res);
      }
      else if (url === '/miarchivo') {
        mostrarArchivos(req, res);
      }


      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?
      // No se ve, probablemente porque el servidor no tiene una ruta para servir archivos estáticos como imágenes. Para solucionar esto, tendríamos que configurar el servidor para que pueda servir archivos desde un directorio específico, como "public" o "assets", donde podríamos colocar la imagen y luego referenciarla en el archivo HTML.

      //Agrega una ruta /opinion
      //Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      //¿Qué es el freedombox?
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      
      
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html