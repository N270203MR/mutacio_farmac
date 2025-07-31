let dades;

fetch('./dades.json')
  .then(response => response.json())
  .then(json => {
    dades = json;
    const gens = Object.keys(dades);
    omplirSelect('gen1', gens);
    omplirSelect('gen2', gens);
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

['gen1', 'gen2'].forEach(genId => {
  document.getElementById(genId).addEventListener('change', (e) => {
    const fenotipId = genId === 'gen1' ? 'fenotip1' : 'fenotip2';
    const val = e.target.value;
    if (val && dades[val]) {
      omplirSelect(fenotipId, Object.keys(dades[val]));
    } else {
      document.getElementById(fenotipId).innerHTML = '<option value="">-- Selecciona --</option>';
    }
  });
});

function mostrarRecomanacio() {
  const g1 = document.getElementById('gen1').value;
  const f1 = document.getElementById('fenotip1').value;
  const g2 = document.getElementById('gen2').value;
  const f2 = document.getElementById('fenotip2').value;
  let text = '';

  if (g1 && f1 && dades[g1]?.[f1]) {
    text += `<h3>${g1} - ${f1}</h3><p>${dades[g1][f1]}</p>`;
  }
  if (g2 && f2 && dades[g2]?.[f2]) {
    text += `<h3>${g2} - ${f2}</h3><p>${dades[g2][f2]}</p>`;
  }

  document.getElementById('resultat').innerHTML = text || '<p>No hi ha recomanació disponible.</p>';
}

function descarregarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const resultatHTML = document.getElementById('resultat');
  const text = resultatHTML.innerText || 'Cap recomanació disponible.';
  doc.setFontSize(12);
  doc.text(text, 10, 10);
  doc.save('recomanacio_farmacogenetica.pdf');
}
