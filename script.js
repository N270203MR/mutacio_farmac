
let dades = [];

fetch('dades.json')
  .then(response => response.json())
  .then(json => {
    dades = json;

    const gens = [...new Set(dades.flatMap(d => d.gens.split('+').map(g => g.trim())))].sort();
    const fenotips = [...new Set(dades.flatMap(d => d.fenotips.split('+').map(f => f.trim())))].sort();

    ["gen1", "gen2"].forEach(id => {
      const sel = document.getElementById(id);
      sel.innerHTML = '<option value="">-- Selecciona un gen --</option>';
      gens.forEach(g => sel.innerHTML += `<option value="${g}">${g}</option>`);
    });

    ["fenotip1", "fenotip2"].forEach(id => {
      const sel = document.getElementById(id);
      sel.innerHTML = '<option value="">-- Selecciona un fenotip --</option>';
      fenotips.forEach(f => sel.innerHTML += `<option value="${f}">${f}</option>`);
    });
  });
      const sel = document.getElementById(id);
      sel.innerHTML = '<option value="">-- Selecciona un fenotip --</option>';
      fenotips.forEach(f => sel.innerHTML += `<option value="${f}">${f}</option>`);
    });
  });

const btnPDF = document.getElementById("descarregaPDF");

function generaInforme(dades) {
  let html = "<h2>Informe farmacogenètic</h2>";
  dades.forEach(d => {
    html += `
      <div class="card">
        <p><span class="label">Gen(s):</span> ${d.gens}</p>
        <p><span class="label">Fenotip(s):</span> ${d.fenotips}</p>
        <p><span class="label">Fàrmac:</span> ${d.farmac}</p>
        <p><span class="label">Família:</span> ${d.familia}</p>
        <p><span class="label">Nivell:</span> ${d.nivell}</p>
        <p><span class="label">Recomanació:</span> ${d.recomanacio}</p>
        <p><span class="label">Font:</span> ${d.font}</p>
      </div>
    `;
  });
  return html;
}

document.getElementById("consultar").addEventListener("click", () => {
  const g1 = document.getElementById("gen1").value;
  const f1 = document.getElementById("fenotip1").value;
  const g2 = document.getElementById("gen2").value;
  const f2 = document.getElementById("fenotip2").value;
  const resultat = document.getElementById("resultat");

  resultat.innerHTML = "";

  const combinacio = g2 && f2 ? `${g1} + ${g2}` : g1;
  const fenotips = g2 && f2 ? `${f1} + ${f2}` : f1;

  const coincidencies = dades.filter(d => d.gens === combinacio && d.fenotips === fenotips);

  if (coincidencies.length === 0) {
    resultat.innerHTML = "<p>No s'ha trobat cap recomanació per aquesta combinació.</p>";
    btnPDF.style.display = "none";
    return;
  }

  resultat.innerHTML = generaInforme(coincidencies);
  btnPDF.style.display = "inline-block";

  btnPDF.onclick = () => {
    const win = window.open('', 'PRINT', 'height=600,width=800');
    win.document.write(`
      <html><head><title>Informe farmacogenètic</title></head><body style="font-family: Arial; color:#0b2e59;">
      <img src="logo.png" style="height:50px;" alt="UDMMP Trueta">
      ${generaInforme(coincidencies)}
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };
});

