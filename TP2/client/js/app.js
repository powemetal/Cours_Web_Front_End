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

const search_input = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", (e) => {
  const item = search_input.value;
  if (item) {
    afficherListeCocktails(recherche("search", item));
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


