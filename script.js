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
  document.getElementById("consultar").addEventListener("click", () => {
  // ... codi de cerca anterior

  const btnPDF = document.getElementById("descarregaPDF");

  if (trobats.length > 0) {
    btnPDF.style.display = "inline-block";
    btnPDF.onclick = () => {
      const win = window.open('', 'PRINT', 'height=600,width=800');
      win.document.write(`<html><head><title>Informe farmacogenètic</title></head><body>`);
      win.document.write('<h1>Informe farmacogenètic</h1>');

      trobats.forEach(d => {
        win.document.write(`
          <p><strong>Gen(s):</strong> ${d.gens}</p>
          <p><strong>Fenotip(s):</strong> ${d.fenotips}</p>
          <p><strong>Fàrmac:</strong> ${d.farmac}</p>
          <p><strong>Família:</strong> ${d.familia}</p>
          <p><strong>Nivell:</strong> ${d.nivell}</p>
          <p><strong>Recomanació:</strong> ${d.recomanacio}</p>
          <p><strong>Font:</strong> ${d.font}</p>
          <hr>
        `);
      });

      win.document.write('</body></html>');
      win.document.close();
      win.focus();
      win.print();
      win.close();
    };
  } else {
    btnPDF.style.display = "none";
  }
});
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
   }

