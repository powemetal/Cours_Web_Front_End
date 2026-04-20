export const req_getListeCocktails = async () => {
    const reponse = await fetch("/cocktails");
    const objReponse = await reponse.json(); // Attendre pour avoir toutes les données envoyées par le serveur.
    // alert(JSON.stringify(objReponse));
    return objReponse.donnees;
}