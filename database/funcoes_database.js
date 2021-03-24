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

// Reconhecendo pedido de criacao de conta 
function createRequest() {
    // Procedimento de login
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
        })
        .catch((error) => {
            console.log("Erro ao realizar o login!");
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

// Login do usuario autenticado
function loginRequest() {
    // Acoes do usuario autenticado
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var author = firebase.Auth().currentUser;
            // Update um documento somente se o autor esta autenticado
            function update(nome_doc) {
                return db.collection("Library").doc(nome_doc.toString()).where("author", "==", author.uid).update({
                    nome: nome_add,
                    tema: tema_add,
                    url: url_add,
                    css: css_add,
                    author: firebase.auth().currentUser.uid,
                    time: firebase.timestamp.now()
                }) .then(() => {
                    console.log("Arquivo atualizado com sucesso!");
                }) .catch((error) => {
                    console.log("Erro ao atualizar arquivo!")
                    var errorCode = error.code;
                    var errorMessage = error.message;
                })
            }

            function remove(nome_doc) {
                db.collection("Library").doc(nome_doc.toString()).where("author", "==", author.uid).delete()
                .then(() => {
                    console.log("Arquivo removido com sucesso!");
                }) .catch((error) => {
                    console.log("Erro ao remover arquivo!");
                    var errorCode = error.code;
                    var errorMessage = error.message;
                })
            }
        // https://firebase.google.com/docs/reference/js/firebase.User
        } 
    });
}

// Saida do usuario
firebase.auth().signOut()
    .then(() => {
        console.log("Logout realizadom com sucesso!");
    })
    .catch((error) => {
        console.log("Erro ao realizar o logout, tente novamente!");
        var errorCode = error.code;
        var errorMessage = error.message;
    })

// Adicionando dados
function insere() {
    db.collection("Library").doc(nome_add.toString()).set({
        nome: nome_add,
        tema: tema_add,
        url: url_add,
        css: css_add,
        author: firebase.auth().currentUser.uid,
        time: firebase.timestamp.now()
    }) .then(() => {
        console.log("Aruivo adicionado com sucesso!");
    }) .catch((error) => {
        console.log("Erro ao adicionar arquivo!");
        var errorCode = error.code;
        var errorMessage = error.message;
    })
}
