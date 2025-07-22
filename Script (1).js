let dades= [];
fetch("dades.json")
.then(response=> resoinse.json())
.then(json =>(
  dades=json;
));
function cercar() (
const genInput =document.getElementById("gen").value.trim().toUpperCase():
const farmaInput = document.getElementById("farmac").value.trim().toLowerCase();

const resultats = dades.filter(item =>
  item.gen.toUpperCase() === genInput &&
  item.farmac.toLowerCase === farmacInput
);
const div = document.getElementById("resultat");
div.inner HTML +=
  if (resultats length >0) (
  resultats.forEarth (r => (
    div.innerHTML +=
     <p><strong>Gen:</strong> $(r.gen)</p>
     <p><strong>Farmac:</strong> $(r.farmac)</p>
     <p><strong>Nivell:</strong> $(r.nivell)</p>
     <p><strong>Fenotip:</strong> $(r.fenotip)</p>
     <p><strong>Gens implicats:</strong> $(r.Gens_implicats)</p>
     <p><strong>Malaltia associada:</strong> $(r.malaltia_associada)</p>
     <p><strong>Recomanació:</strong> $(r.recomanacio)</p>
    <hr>
  ;
));
(else (
  div.innerHTML = "Res de res";
))
           
