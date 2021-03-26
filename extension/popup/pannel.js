const buttonSet = document.getElementById('set');
const buttonReset = document.getElementById('reset');
const firebase = require("firebase");
const firebaseConfig = require("../../config/firebase_config.json")
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

let cookieVal = { cssCode: 'body{ color: blue; border:5px solid red }' };

function getActiveTab() { return browser.tabs.query({ active: true, currentWindow: true }) }

buttonSet.onclick = (e, ev) => {
  console.log("after insert css")
  getActiveTab().then((tabs) => {
    browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
      .then(null, error => console.log(error));
    browser.cookies.set({
      url: tabs[0].url,
      name: "manual-dark-mode",
      value: JSON.stringify(cookieVal)
    })
  })
}

buttonReset.onclick = (e, ev) => {
  getActiveTab().then((tabs) => {

    browser.tabs.removeCSS({ code: cookieVal.cssCode })
    cookieVal = { cssCode: '' };

    browser.cookies.remove({
      url: tabs[0].url,
      name: "bgpicker"
    })
  });
}


browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
