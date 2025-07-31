let dades = [];

// Quan el DOM està carregat
document.addEventListener("DOMContentLoaded", function () {
  fetch('dades.json')
    .then(response => response.json())
    .then(json => {
      dades = json;

      const gens1 = [...new Set(dades.map(d => d["Gen 1"]))];
      const gens2 = [...new Set(dades.map(d => d["Gen 2"]))];

      omplirSelect('gen1', gens1);
      omplirSelect('gen2', gens2);

      document.getElementById('gen1').addEventListener('change', () => {
        const val = document.getElementById('gen1').value;
        const fenotips = [...new Set(dades.filter(d => d["Gen 1"] === val).map(d => d["Fenotip 1"]))];
        omplirSelect('fenotip1', fenotips);
      });

      document.getElementById('gen2').addEventListener('change', () => {
        const val = document.getElementById('gen2').value;
        const fenotips = [...new Set(dades.filter(d => d["Gen 2"] === val).map(d => d["Fenotip 2"]))];
        omplirSelect('fenotip2', fenotips);
      });
    });
});

function omplirSelect(id, opcions) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">-- Selecciona --</option>';
  opcions.forEach(opcio => {
    const opt = document.createElement('option');
    opt.value = opcio;
    opt.textContent = opcio;
    select.appendChild(opt);
  });
}

function mostrarRecomanacio() {
  const g1 = document.getElementById("gen1").value;
  const f1 = document.getElementById("fenotip1").value;
  const g2 = document.getElementById("gen2").value;
  const f2 = document.getElementById("fenotip2").value;

  const resultat = dades.find(d => d["Gen 1"] === g1 && d["Fenotip 1"] === f1 && d["Gen 2"] === g2 && d["Fenotip 2"] === f2);

  const div = document.getElementById("resultat");
  if (resultat) {
    div.innerHTML = `
      <h3>Recomanació</h3>
      <p><strong>Fàrmac:</strong> ${resultat["Fàrmac"]}</p>
      <p><strong>Recomanació:</strong> ${resultat["Recomanació"]}</p>
      <p><strong>Font:</strong> ${resultat["Font"]}</p>
    `;
  } else {
    div.innerHTML = '<p>No s’ha trobat cap recomanació per aquesta combinació.</p>';
  }
}

function descarregarPDF() {
  const resultatHTML = document.getElementById("resultat").innerText;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = resultatHTML.split('\n');
  text.forEach((line, i) => {
    doc.text(line, 10, 10 + i * 10);
  });
  doc.save("recomanacio.pdf");
}
