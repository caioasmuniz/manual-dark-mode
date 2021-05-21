/* ---------- INITIALIZING FIRESTORE ----------- */
import firebaseConfig from "../config/firebase-config.json";
// Initialize Cloud Firestore through Firebase
let require 
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/* ---------------- */
var doc_name = document.getElementById("nome");
var doc_filter = document.getElementById("tema");
var doc_url = document.getElementById("url");
var doc_css = document.getElementById("codigo");

/* ---------------- USER AUTHENTICATION ------------------ */
// User Only Functions - INSERT
function insert(doc_name) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var author = firebase.Auth().currentUser;
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
        } else {
            alert("Usuário não autenticado");
        }
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
