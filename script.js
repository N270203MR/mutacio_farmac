let dades = [];

fetch('dades.json')
  .then(response => response.json())
  .then(json => {
    dades = json;
    omplirSelects();
  });

function omplirSelects() {
  const gens = [...new Set(dades.map(d => d.gen))];
  const farmacs = [...new Set(dades.map(d => d.farmac))];

  const genSelect = document.getElementById("gen");
  const farmacSelect = document.getElementById("farmac");

  gens.forEach(gen => {
    const opt = document.createElement("option");
    opt.value = gen;
    opt.textContent = gen;
    genSelect.appendChild(opt);
  });

  farmacs.forEach(farmac => {
    const opt = document.createElement("option");
    opt.value = farmac;
    opt.textContent = farmac;
    farmacSelect.appendChild(opt);
  });
}

function cercar() {
  const gen = document.getElementById("gen").value;
  const farmac = document.getElementById("farmac").value;

  const resultats = dades.filter(item =>
    item.gen === gen && item.farmac === farmac
  );

  const div = document.getElementById("resultat");
  div.innerHTML = "";

  if (resultats.length > 0) {
    resultats.forEach(r => {
      const informe = `
        <p><strong>Informe mèdic personalitzat</strong></p>
        <p><strong>Gen afectat:</strong> ${r.gen}</p>
        <p><strong>Fàrmac:</strong> ${r.farmac}</p>
        <p><strong>Nivell d’evidència:</strong> ${r.nivell}</p>
        <p><strong>Fenotip:</strong> ${r.fenotip}</p>
        <p><strong>Gens implicats:</strong> ${r.gens_implicats}</p>
        <p><strong>Malaltia associada:</strong> ${r.malaltia}</p>
        <p><strong>Recomanació clínica:</strong> ${r.recomanacio}</p>
        <hr>
      `;
      div.innerHTML += informe;
    });
  } else {
    div.innerHTML = "No s'ha trobat cap recomanació per aquesta combinació.";
  }
}
