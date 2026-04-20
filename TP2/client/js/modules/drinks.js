import { req_getListeCocktails } from "./requetes.js";
//DevOps



const creerCard = (unCocktail) => {
  let bgStyle = "";
  let couleurGlow = "";
  const cocktailId =unCocktail.name.replace(/[ \']/g, '-').toLowerCase();
  const idIng = `ing-${cocktailId}`;
  const idPrep = `prep-${cocktailId}`;


  const preparation = unCocktail.preparation 
  ? unCocktail.preparation.split(".")
      .map(item => item.trim()) 
      .filter(item => item.length > 0)
  : []

  // color = tableau
  if (Array.isArray(unCocktail.colors)) {
    const gradient = unCocktail.colors.join(", ");
    bgStyle = `linear-gradient(135deg, ${gradient})`;
    couleurGlow = unCocktail.colors[0];
  }
  // color = string
  else if (typeof unCocktail.colors === "string") {
    bgStyle = unCocktail.colors;
    couleurGlow = unCocktail.colors;
  }
  const glass = unCocktail.glass;
  return `
    <div class="card mb-3 mx-auto cocktail-card col-12 col-md-6 col-lg-3" style="width: 19rem; --cocktail-bg: ${bgStyle}; --cocktail-glow: ${couleurGlow};">
      <div class="card-body d-flex flex-column">

        <h4 class="card-title text-center">${unCocktail.name}</h4>
        <hr>
        <div class="glass-container mx-auto w-200">
          <img src="./images/verres/${glass}.png" class="glass-img" alt="${glass}">
        </div>
        <hr>
        <div class="card-details flex-grow-1">
          <p class="card-text">${unCocktail.category ? `<b>Categorie: </b>${unCocktail.category}` : `<b>Categorie: </b>Non définie`}</p>
          <p class="card-text"><b>Verre: </b>${unCocktail.glass}</p>
          <p class="card-text mb-1 collapsed" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#${idIng}"><b>Ingredients: </b></p>
            <div class="collapse" id="${idIng}">
              <ul class="ingredients-list card-text list-unstyled">
                ${unCocktail.ingredients ? unCocktail.ingredients.map((ingredient) => `<li>${ingredient.amount ? ingredient.amount + " " : ""} ${ingredient.unit ? ingredient.unit + " " : ""} 
                ${ingredient.ingredient ? ingredient.ingredient : ""} ${ingredient.special ? ingredient.special : ""} ${ingredient.label ? `<br><i>- (${ingredient.label})</i>` : ""}</li>`).join(""): "" }
              </ul>
            </div>
          <p class="card-text mb-1 collapsed" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#${idPrep}"><b>Preparation: </b></p>
          <div class="collapse" id="${idPrep}">
            <ul class="ingredients-list card-text list-unstyled">
              ${preparation.length > 0 ? preparation.map((etape) => `<li>-${etape}</li>`).join("") : `<li>Non définie</li>`}
            </ul>
          </div>
        </div>
        <hr>
        <div class="card-buttons">
          <button type="button" class="btn btn-outline-light">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button data-id="${unCocktail.id}" type="button" class="btn btn-outline-light">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};


export const afficherListeCocktails = async () => {
  const tabCocktails = await req_getListeCocktails();
  // Afficher les cocktails dans la page index au format de "card" de Bootstrap.
  let listeCards = `<div class="row">`;
  tabCocktails.forEach((unCocktail) => {
    listeCards += creerCard(unCocktail);
  });
  listeCards += `</div>`;
  document.getElementById("lst_cocktails").innerHTML = listeCards;
};
