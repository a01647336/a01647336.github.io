// servidor_express.js

// Express hace mucho más sencillo crear servidores y rutas.
// Comparado con http puro, el código queda más limpio, organizado
// y fácil de mantener cuando el proyecto crece.

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const puerto = 1985;

// Esto ayuda a obtener la ruta actual correctamente usando módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para leer JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// Gracias a esto ya se pueden ver imágenes, CSS, JS, etc.
app.use(express.static(__dirname));

// Honestamente Express sí se siente muchísimo más cómodo que usar
// createServer directamente. Las rutas son más fáciles de leer
// y agregar endpoints toma menos código.

// ==========================================
// FUNCIONES
// ==========================================

function leerHTML(archivo, res) {
    fs.readFile(archivo, 'utf8', (error, data) => {
        if (error) {
            // 500 = Error interno del servidor
            res.status(500).send('Oh no!!!!');
            return;
        }

        // 200 = Todo salió correctamente
        res.status(200).send(data);
    });
}

// ==========================================
// RUTAS HTML
// ==========================================

// Página principal
app.get('/', (req, res) => {
    leerHTML('bienvenida.html', res);
});

// Perfil
app.get('/perfil', (req, res) => {
    leerHTML('perfil.html', res);
});

// Equipo
app.get('/equipo', (req, res) => {
    leerHTML('equipo.html', res);
});

// Movimientos
app.get('/movimientos', (req, res) => {
    leerHTML('movimientos.html', res);
});

// Opinión
app.get('/opinion', (req, res) => {
    leerHTML('opinion.html', res);
});

// Archivo
app.get('/miarchivo', (req, res) => {
    leerHTML('miarchivo.html', res);
});

// Usuarios
app.get('/usuarios', (req, res) => {
    leerHTML('usuarios.html', res);
});

// ==========================================
// API USUARIOS
// ==========================================

app.get('/api/usuarios', (req, res) => {

    const usuarios = [
        {
            nombre: "Punk",
            saldo: "0"
        },
        {
            nombre: "Guante",
            saldo: "2"
        },
        {
            nombre: "Isaac",
            saldo: "1000"
        }
    ];

    // Express automáticamente convierte a JSON
    // usando res.json()
    res.status(200).json(usuarios);
});

// ==========================================
// API MOVIMIENTOS
// ==========================================

app.get('/api/movimientos', (req, res) => {

    const movimientos = [
        {
            tipo: "Depósito",
            monto: 1500
        },
        {
            tipo: "Retiro",
            monto: 300
        },
        {
            tipo: "Transferencia",
            monto: 700
        }
    ];

    res.status(200).json(movimientos);
});

// ==========================================
// RETO KUESKI
// ==========================================

// Simular préstamo
app.get('/api/loans/simulate', (req, res) => {

    const resultado = {
        interes: 1200,
        totalPagar: 11200,
        pagoMensual: 1866.67
    };

    res.status(200).json(resultado);
});

// Crear solicitud
app.get('/api/loans/request', (req, res) => {

    const solicitud = {
        loanId: 101,
        status: "pendiente"
    };

    res.status(200).json(solicitud);
});

// Historial
app.get('/api/loans/history', (req, res) => {

    const historial = [
        {
            loanId: 101,
            monto: 10000,
            status: "pendiente"
        },
        {
            loanId: 102,
            monto: 5000,
            status: "aprobado"
        }
    ];

    res.status(200).json(historial);
});

// Detalle
app.get('/api/loans/detail', (req, res) => {

    const detalle = {
        loanId: 101,
        monto: 10000,
        plazo: 6,
        interes: 1200,
        totalPagar: 11200,
        status: "pendiente"
    };

    res.status(200).json(detalle);
});

// Elegibilidad
app.get('/api/loans/eligibility', (req, res) => {

    const resultado = {
        aprobado: true,
        montoMaximo: 20000
    };

    res.status(200).json(resultado);
});

// Actualizar estado
app.get('/api/loans/status', (req, res) => {

    const respuesta = {
        message: "Estado actualizado correctamente"
    };

    res.status(200).json(respuesta);
});

// ==========================================
// 404
// ==========================================

// Esta ruta se ejecuta si ninguna anterior coincide
app.use((req, res) => {

    res.status(404).send(
        'Página no encontrada. Skill Issue brother 😭'
    );
});

// ==========================================
// SERVIDOR
// ==========================================

app.listen(puerto, () => {
    console.log(`Servidor Express escuchando en puerto ${puerto}`);
});