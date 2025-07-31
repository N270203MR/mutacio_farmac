let dades = {};

document.addEventListener("DOMContentLoaded", function () {
  fetch('dades.json')
    .then(response => response.json())
    .then(json => {
      dades = json;
      const gens = Object.keys(dades);
      omplirSelect('gen1', gens);
      omplirSelect('gen2', gens);

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
    });
});
