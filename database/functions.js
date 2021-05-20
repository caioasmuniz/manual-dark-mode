const firebaseConfig = require("../config/firebase-config");
/* --------------- INITIALIZING FIRESTORE ---------------- */

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/* ---------------- IMPORTING DATA FROM FORMS ------------ */
var doc_name = document.getElementById("nome");
var doc_filter = document.getElementById("tema");
var doc_url = document.getElementById("url");
var doc_css = document.getElementById("codigo");

/* ---------------- USER AUTHENTICATION ------------------ */
// Login Request
function loginRequest() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var author = firebase.Auth().currentUser;

            // User Only Functions - INSERT
            function insert(doc_name) {
                return db.collection("Library").doc(doc_name.toString()).set({
                    nome: doc_name,
                    tema: doc_filter,
                    url: doc_url,
                    css: doc_css,
                    author: author.uid(),
                    time: firebase.timestamp.now()
                })  .then (() => {
                    console.log("Arquivo criado com sucesso!");
                }) .catch ((error) => {
                    console.log("Erro ao criar o arquivo!");
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Codigo do erro: ', +errorCode);
                })
            }
/*
            // User Only Functions - UPDATE
            function update(doc_name) {
                return db.collection("Library").doc(doc_name.toString()).where("author", "==", author.uid).update({
                    nome: doc_name,
                    tema: doc_filter,
                    url: doc_url,
                    css: doc_css,
                    author: firebase.auth().currentUser.uid,
                    time: firebase.timestamp.now()
                }) .then (() => {
                    console.log("Arquivo atualizado com sucesso!");
                }) .catch ((error) => {
                    console.log("Erro ao atualizar o arquivo!");
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Codigo do erro: ', +errorCode);
                })
            }

            // User Only Functions - REMOVE
            function remove(doc_name) {
                db.collection("Library").doc(doc_name.toString()).where("author", "==", author.uid).delete()
                . then (() => {
                    console.log("Arquivo removido com sucesso!");
                }) .catch ((error) => {
                    console.log("Erro ao remover arquivo!");
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Codigo do erro: ', +errorCode);
                })
            }
*/
        }
    })
}

// Logout Request
function logoutRequest() {
    firebase.auth().signOut()
    . then (() => {
        console.log("Logout realizado com sucesso!");
    }) .catch ((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Codigo do erro: ', +errorCode);
    })
}

/* ------------------ PUBLIC FUNCTIONS ------------------- */
// teste de funcionalidade do botao
function btnTest() {
    alert('Botão Funcionando sem Evento de LOGIN');
}

// redirecionar para a pagina de download da extensao
function downloadExtension() {
    alert('Redirecionar e Iniciar download da extensao')
}

// verificar a presença da extensao e baixar o tema
function downloadTheme() {
    alert('Iniciar donwload do tema e atualizar extensao')
}

// detectar tentativa de inserir um arquivo sem estar logado
function btn_upload() {
    alert('Usuario não autenticado!\nEntre com sua conta para inserir o seu tema!')
    firebase.auth().onAuthStateChanged((user) => {
        if(user != true) {
            alert('Usuario não autenticado!\nEntre com sua conta para inserir o seu tema!');
            loginRequest();
        } else {
            loginRequest().insert(doc_name);
        }
    })
}