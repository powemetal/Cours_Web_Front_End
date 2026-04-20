// =============================================================================
// serveur.js - Serveur Node.js avec Express
// Cours : 420-931-MA (Developpement Web)
// Description : Serveur Express qui expose des routes pour les cocktails
//               et sert les fichiers statiques du client.
// =============================================================================

import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const REPERTOIRE_CLIENT = path.join(__dirname, "client");
const FICHIER_COCKTAILS = path.join(
  __dirname,
  "serveur",
  "donnees",
  "cocktails.json",
);

app.use(express.json());
app.use(express.static(REPERTOIRE_CLIENT));

// Zone de traitement
// Objet de réponsa à retourner au client
const reponse = { statut: true, msg: "", donnees: null };

const lireFichierCocktails = async () => {
  const contenu = await readFile(FICHIER_COCKTAILS, "utf-8");
  return JSON.parse(contenu);
};

const ecrireFichierCocktails = async (tabCocktails) => {
  const contenu = JSON.stringify(tabCocktails, null, 2);
  await writeFile(FICHIER_COCKTAILS, contenu, "utf-8");
};

// Route pour obtenir la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(REPERTOIRE_CLIENT, "index.html"));
});

// Route pour obtenir la liste des cocktails
app.get("/cocktails", async (req, res) => {
  // Traitement des exceptions
  try {
    const tabCocktails = await lireFichierCocktails();
    reponse.statut = true;
    reponse.msg = "";
    reponse.donnees = tabCocktails;
    res.json(reponse);
  } catch (err) {
    console.log("ERREUR : " + err); // Voir l'erreur dans la console (pour deboggage)
    reponse.statut = false;
    reponse.msg =
      "Problème pour traiter votre requête. Nous sommes sérieux et on va s'en occuper.";
    reponse.donnees = null;
    res.json(reponse);
  }
});

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("  Serveur demarre avec succes !");
  console.log(`  Adresse : http://localhost:${PORT}`);
  console.log("=".repeat(50));
});
