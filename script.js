let data = [];

fetch('dades.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    const gen1s = [...new Set(data.map(row => row["Gen 1"]))];
    const gen2s = [...new Set(data.map(row => row["Gen 2"]))];
    const fenotips1 = [...new Set(data.map(row => row["Fenotip 1"]))];
    const fenotips2 = [...new Set(data.map(row => row["Fenotip 2"]))];

    omplirSelect("gen1", gen1s);
    omplirSelect("fenotip1", fenotips1);
    omplirSelect("gen2", gen2s);
    omplirSelect("fenotip2", fenotips2);

    document.querySelectorAll("select").forEach(select => {
      select.addEventListener("change", mostrarResultat);
    });
  });

function omplirSelect(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">-- Selecciona --</option>' +
    options.map(o => `<option value="${o}">${o}</option>`).join('');
}

function mostrarResultat() {
  const gen1 = document.getElementById("gen1").value;
  const fenotip1 = document.getElementById("fenotip1").value;
  const gen2 = document.getElementById("gen2").value;
  const fenotip2 = document.getElementById("fenotip2").value;

  const filtrat = data.filter(row =>
    row["Gen 1"] === gen1 &&
    row["Fenotip 1"] === fenotip1 &&
    row["Gen 2"] === gen2 &&
    row["Fenotip 2"] === fenotip2
  );

  const container = document.getElementById("resultat");

  if (filtrat.length === 0) {
    container.innerHTML = "No hi ha recomanacions disponibles per aquesta combinació.";
  } else {
    container.innerHTML = filtrat.map(row => `
      <strong>Família:</strong> ${row["Família"]}<br>
      <strong>Fàrmac:</strong> ${row["Fàrmac"]}<br>
      <strong>Recomanació:</strong> ${row["Recomanació"]}<br>
      <strong>Font:</strong> ${row["Font"]}<br>
      <strong>Comentari:</strong> ${row["Comentari"] || "-"}<br><hr>
    `).join('');
  }
}
