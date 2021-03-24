/* ------------------------ INICIALIZAÇÃO DO FIRESTORE ----------------------- */
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});
    var db = firebase.firestore();

/* ------------------------- AUTENTICAÇÃO DO USUARIO ------------------------- */
// Pegando dados pelos campos do formulario do site
var nome_add = document.getElementById('nome');
var tema_add = document.getElementById('tema');
var url_add = document.getElementById('site');
var css_add = document.getElementById('codigo');

// Reconhecendo pedido de login 
var loginRequest = document.getElementById("").onclick = ""; 

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
        var author = firebase.Auth().currentUser;
        // Update um documento somente se o autor esta autenticado
            return db.collection("Library").doc(nome_add.toString()).where("author", "==", author.uid).update({
                nome: nome_add,
                tema: tema_add,
                url: url_add,
                css: css_add,
                author: firebase.auth().currentUser.uid,
                time: firebase.timestamp.now()
        }) .then(() => {
            
        }) .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        })
    // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
        return -1;
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

// Adicionando dados
db.collection("Library").doc(nome_add.toString()).set({
    nome: nome_add,
    tema: tema_add,
    url: url_add,
    css: css_add,
    author: firebase.auth().currentUser.uid,
    time: firebase.timestamp.now()
}) .then(() => {

}) .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
})