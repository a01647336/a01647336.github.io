function arreglarWeb() {
  const isExperiencia21 = window.location.hostname.endsWith("experiencia21.tec.mx");

  if (isExperiencia21) {
    const replaceTablero = () => {
      const tablero = document.querySelector(
        "#dashboard_header_container span.hidden-phone"
      );
      if (!tablero) {
        return false;
      }
      tablero.textContent = "Cosas por chambear";
      return true;
    };

    if (!replaceTablero()) {
      const observer = new MutationObserver(() => {
        if (replaceTablero()) {
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  const isChatGPT =
    window.location.hostname === "chat.openai.com" ||
    window.location.hostname === "chatgpt.com" ||
    window.location.hostname.endsWith(".chatgpt.com");

  if (isChatGPT) {
    const targetText = "Listo cuando tú lo estés.";
    const replacementText = "estoy listo mailov";
    let chatgptIntervalId = null;

    const replaceChatGPTHeadline = () => {
      const candidates = document.querySelectorAll("main#main *");
      let replaced = 0;

      candidates.forEach((node) => {
        if (node.children.length > 0) {
          return;
        }
        if (node.textContent && node.textContent.trim() === targetText) {
          node.textContent = replacementText;
          replaced += 1;
        }
      });

      if (replaced > 0) {
        console.log("[ExtensionDigital] ChatGPT headline replaced:", replaced);
      }

      return replaced > 0;
    };

    console.log("[ExtensionDigital] ChatGPT detected");

    const observer = new MutationObserver(() => {
      replaceChatGPTHeadline();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    if (chatgptIntervalId === null) {
      chatgptIntervalId = window.setInterval(() => {
        replaceChatGPTHeadline();
      }, 1000);
    }

    replaceChatGPTHeadline();
  }

  const isElTapan = window.location.hostname.endsWith("eltapancomascota.com");

  if (isElTapan) {
    const replaceElTapanInicio = () => {
      const inicioLink = document.querySelector(
        "a.menu-link[aria-current='page']"
      );
      if (!inicioLink) {
        return false;
      }
      if (inicioLink.textContent.trim().toLowerCase() === "inicio") {
        inicioLink.textContent = "INICIOOOOO";
        return true;
      }
      return false;
    };

    if (!replaceElTapanInicio()) {
      const observer = new MutationObserver(() => {
        if (replaceElTapanInicio()) {
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  const logoGoogle = document.querySelector('svg[aria-label="Google"]');
  if (logoGoogle) {
    const mensaje = document.createElement('span');
    mensaje.textContent = "[ ALGORITMO EXTRACTIVISTA ]";
    mensaje.style.color = "#ff3333";
    mensaje.style.fontWeight = "bold";
    mensaje.style.fontSize = "20px";
    logoGoogle.replaceWith(mensaje);
  }

  if (!document.getElementById('banner-decolonial')) {
    const banner = document.createElement('div');
    banner.id = 'banner-decolonial';
    banner.textContent = "⚠️ Alerta: Estás en un lugar extractivista.";
    banner.style.cssText = `
      background-color: #ff3333;
      color: white;
      text-align: center;
      padding: 7px;
      font-family: monospace;
      font-size: 12px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999999;
    `;
  
    document.body.style.marginTop = "35px";
    document.body.appendChild(banner);
  }
}

window.addEventListener('load', arreglarWeb);
