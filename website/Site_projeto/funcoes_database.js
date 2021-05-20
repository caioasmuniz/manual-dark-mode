const firebaseConfig = {
    apiKey: "AIzaSyCN7aowFxK1dkqJ5JWPB-mQ5CwAis5A-9k",
    authDomain: "manual-dark-mode-14b3f.firebaseapp.com",
    projectId: "manual-dark-mode-14b3f",
    storageBucket: "manual-dark-mode-14b3f.appspot.com",
    messagingSenderId: "358791318355",
    appId: "1:358791318355:web:a4dc9dc21f81547a56afa6",
    measurementId: "G-899R097H6V"
  };
/* ---------- INITIALIZING FIRESTORE ----------- */
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/* ---------------- */
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
                    css: doc.css,
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
function btnTest() {
    alert('Botão Funcionando sem Evento de LOGIN');
}

function downloadExtension() {
    alert('Redirecionar e Iniciar download da extensao')
}

function downloadTheme() {
    alert('Iniciar donwload do tema e atualizar extensao')
}
