import { afficherListeCocktails, afficherListe, filtrer, recherche, tri } from "./modules/vues.js";



document.addEventListener("DOMContentLoaded", async () => {
  await afficherListeCocktails();
  await afficherListe("category");
  await afficherListe("glass");
  await afficherListe("ingredients");
document.getElementById("tous").addEventListener("click", (e) => {  afficherListeCocktails(); });

["category", "glass", "ingredients"].forEach((filtre) => {
document.getElementById(`dropdown-${filtre}`).addEventListener("click", (e) => {
    const item = e.target.closest(`[data-${filtre}]`);
    if (!item) return;
    const valeur = item.dataset[filtre];
    if (valeur === "Tous") {
      afficherListeCocktails(); 
    } else {
      afficherListeCocktails(filtrer(filtre, valeur));
    }});});

const searchForm = document.querySelector('form[role="search"]');
const search_input = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const item = search_input.value;
    if (item) {
        const resultats = recherche("search", item);
        afficherListeCocktails(Array.from(resultats));
    } else {
        afficherListeCocktails();
    }
});

document.getElementById("dropdown-tri").addEventListener("click", (e) => {
  const triage = e.target.closest(`[data-tri]`);
  const valeur = triage.dataset.tri;
  tri(valeur);
});
  





});


