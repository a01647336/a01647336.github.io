const template = document.createElement("template");
template.innerHTML = "<div><h1>Oferta: <span id='nombreOferta'></span></h1></div>";


class OfertaElemento extends HTMLElement {

   constructor() {
     super();
     const shadow = this.attachShadow({ mode: "open" });
    // this.textContent="malteada gratis";
    // this.append(template.content);

    const templateContent = template.content.cloneNode(true);
    shadow.append(templateContent);
    // Read the oferta attribute once and show it in the template.
    const span = shadow.querySelector("#nombreOferta");
    if (span) {
      // Empty string fallback avoids showing "null".
      span.textContent = this.getAttribute("oferta") || "";
    }
    console.log("Constructor ", this);
   }

}

customElements.define("oferta-elemento", OfertaElemento);


