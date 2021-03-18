/* ------------------------ INICIALIZAÇÃO DO FIRESTORE ----------------------- */

/*Inserir o SDK do Firebase*/

/* ------------------------- AUTENTICAÇÃO DO USUARIO ------------------------- */
// Reconhecendo pedido de login 
/*var loginRequest = document.getElementById("").onclick = ""; 
    // Procedimento de login
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    // Acoes do usuario autenticado
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        } else {
        // User is signed out
        // ...
        } 
    });

    // Saida do usuario
firebase.auth().signOut()
    .then(() => {
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    })
*/

/* -------------------------- MANIPULAÇÃO DOS DADOS -------------------------- */
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});
    var db = firebase.firestore();

// Adicionando ao BD dados obtidos pelo formulario do site
var nome_add = document.getElementById('nome');
var tema_add = document.getElementById('tema');
var url_add = document.getElementById('site');
var css_add = document.getElementById('codigo');

db.collection("Library").doc(nome_add.toString()).set({
    nome: nome_add,
    tema: tema_add,
    url: url_add,
    css: css_add
}) .then(() => {

}) .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
})
