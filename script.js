let dades = [];

fetch('dades.json')
  .then(response => response.json())
  .then(json => {
    dades = json;
    omplirSelects():;
  });

function omplirSelects() {
  const gen1 = [...new Set(data.map(row => row.Gen1))];
  const gen2 = [...new Set(data.map(row => row.Gen2))];
  const fenotip1 = [...new Set(data.map(row => row.Fenotip1))];
  const fenotip2 = [...new Set(data.map(row => row.Fenotip2))];

  const gen1Select = document.getElementById("Gen 1");
  const fenotip1Select = document.getElementById("Fenotip 1");
  const gen2Select = document.getElementById("Gen 2");
  const fenotip2Select = document.getElementById("Fenotip 2");

  gen.forEach(gen1 => {
    const opt = document.createElement("option");
    opt.value = gen1;
    opt.textContent = gen1;
    gen1Select.appendChild(opt);
    });

    fenotip.forEach(fenotip1 => {
    const opt = document.createElement("option");
    opt.value = fenotip1;
    opt.textContent = fenotip1;
    fenotip1Select.appendChild(opt);
    });

    gen.forEach(gen2 => {
    const opt = document.createElement("option");
    opt.value = gen2;
    opt.textContent = gen2;
    gen2Select.appendChild(opt);
    });

    fenotip.forEach(fenotip2 => {
    const opt = document.createElement("option");
    opt.value = fenotip2;
    opt.textContent = fenotip2;
    fenotip2Select.appendChild(opt);
    });
  }

function omplirSelect(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">-- Selecciona --</option>' +
    options.map(o => `<option value="${o}">${o}</option>`).join('');
}

function cercar() {
  const gen1 = document.getElementById("gen1").value;
  const fenotip1 = document.getElementById("fenotip1").value;
  const gen2 = document.getElementById("gen2").value;
  const fenotip2 = document.getElementById("fenotip2").value;

  const resultats = dades.filter(row =>
    row.Gen1 === gen1 &&
    row.Fenotip1 === fenotip1 &&
    row.Gen2 === gen2 &&
    row.Fenotip2 === fenotip2
  );

  const div = document.getElementById("resultat");
  div.innerHTML = "";

  if (resultat.length > 0) {
    resultats.forEach(r => {
      const informe = 
      <p><strong>Nivell:</strong></p>
      <p><strong>Família:</strong></p>
      <p><strong>Fàrmac:</strong></p>
      <p><strong>Recomanació:</strong></p>
      <p><strong>Font:</strong></p>
      <p><strong>Comentari:</strong></p> 
      <hr>
    `;
    div.innerHTML += informe;
  });
} else {
div.innerHTML = "No s'ha trobat cap recomanació per aquesta combinació";
  }
}
