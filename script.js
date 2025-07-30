let dades = [];

fetch('dades.json')
  .then(response => response.json())
  .then(json => {
    dades = json;

    // Omplim el desplegable de gens
    const gens = [...new Set(dades.map(d => d.gen))].sort();
    const genSelect = document.getElementById("gen");
    gens.forEach(gen => {
      const opt = document.createElement("option");
      opt.value = gen;
      opt.textContent = gen;
      genSelect.appendChild(opt);
    });

    // Omplim el desplegable de fàrmacs
    const farmacs = [...new Set(dades.map(d => d.farmac))].sort();
    const farmacSelect = document.getElementById("farmac");
    farmacs.forEach(farmac => {
      const opt = document.createElement("option");
      opt.value = farmac;
      opt.textContent = farmac;
      farmacSelect.appendChild(opt);
    });
  });

document.getElementById("consultar").addEventListener("click", () => {
  const gen = document.getElementById("gen").value;
  const farmac = document.getElementById("farmac").value;
  const resultat = document.getElementById("resultat");

  resultat.innerHTML = "";

  const coincidencies = dades.filter(d => d.gen === gen && d.farmac === farmac);

  if (coincidencies.length === 0) {
    resultat.innerHTML = "<p>No s'ha trobat cap coincidència per aquesta combinació.</p>";
    return;
  }

  coincidencies.forEach((d, i) => {
    resultat.innerHTML += `
      <div style="margin-bottom: 1em;">
        <strong>Gen:</strong> ${d.gen}<br>
        <strong>Variant:</strong> ${d.variant}<br>
        <strong>Fàrmac:</strong> ${d.farmac}<br>
        <strong>Phenotype:</strong> ${d.phenotype}<br>
        <strong>Nivell d'evidència:</strong> ${d.nivell}<br>
        <strong>Font:</strong> <a href="${d.font}" target="_blank">${d.font}</a>
      </div>
    `;
  });
});

