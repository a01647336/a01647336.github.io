const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.NODEJS3_API_KEY || 'TU_API_KEY_AQUI';

async function obtenerEquipos() {
  try {
    const response = await axios.get(
      'https://api.football-data.org/v4/competitions/PL/teams',
      {
        headers: { 'X-Auth-Token': API_KEY }
      }
    );

    const equipos = response.data.teams;

    console.log('Equipos de la Premier League:\n');
    equipos.forEach(team => {
      console.log(`- ${team.name}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

obtenerEquipos();