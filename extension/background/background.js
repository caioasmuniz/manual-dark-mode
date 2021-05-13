firebase.initializeApp({
  apiKey: "AIzaSyCN7aowFxK1dkqJ5JWPB-mQ5CwAis5A-9k",
  authDomain: "manual-dark-mode-14b3f.firebaseapp.com",
  projectId: "manual-dark-mode-14b3f",
  storageBucket: "manual-dark-mode-14b3f.appspot.com",
  messagingSenderId: "358791318355",
  appId: "1:358791318355:web:a4dc9dc21f81547a56afa6",
  measurementId: "G-899R097H6V"
});

let db = firebase.firestore();

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    //busca por cookie pre-existente
    var gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "manual-dark-mode"
    });
    //se encontra o cookie da extensao, injeta o css na pagina
    gettingCookies.then((cookie) => {
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
          .then(null, error => console.log(error));
      }
    });
  });
}

function handleMessages(data, sender, response) {
  if (data.command === "get-theme") {
    // db.collection("storage").where("url", "==", data.url).get().then((query) => {
    db.collection("storage").get()
      .then((query) => {
        query.forEach(doc => { console.log(doc.data) })
      }).catch(error => console.log(error))
  }
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);

browser.runtime.onMessage.addListener(handleMessages);
