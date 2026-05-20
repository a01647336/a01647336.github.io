const API_URL = "http://localhost:1984/obtenerDatos";

const statusEl = document.getElementById("db-status");
const listEl = document.getElementById("db-data");

const renderItems = (items) => {
  listEl.innerHTML = "";

  if (!items || items.length === 0) {
    statusEl.textContent = "Sin datos disponibles.";
    return;
  }

  statusEl.textContent = `Donantes: ${items.length}`;

  items.forEach((item) => {
    const li = document.createElement("li");
    const label = item.nombre || item.name || item.id || "Registro";
    li.textContent = String(label);
    listEl.appendChild(li);
  });
};

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    renderItems(data);
  } catch (error) {
    statusEl.textContent = "No se pudo cargar la base de datos.";
    listEl.innerHTML = "";
    console.error("[ExtensionDigital] Error al cargar datos:", error);
  }
};

fetchData();
