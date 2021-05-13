const buttonSet = document.getElementById('set');
const buttonReset = document.getElementById('reset');

let cookieVal = { cssCode: 'body{ color: blue; border:5px solid red }' };

function getActiveTab() { return browser.tabs.query({ active: true, currentWindow: true }) }

buttonSet.onclick = (e, ev) => {
  getActiveTab().then((tabs) => {
    browser.runtime.sendMessage({ command: "get-theme", url: tabs[0].url });
    // browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
    //   .then(null, error => console.log(error));
    // browser.cookies.set({
    //   url: tabs[0].url,
    //   name: "manual-dark-mode",
    //   value: JSON.stringify(cookieVal)
    // })
  })
}

buttonReset.onclick = (e, ev) => {
  getActiveTab().then((tabs) => {
    let removing = browser.cookies.remove({
      url: tabs[0].url,
      name: "manual-dark-mode"
    })
    removing.then((cookie) => { browser.tabs.removeCSS({ code: cookie.value.cssCode }) })
  });
}

//   browser.cookies.set({
//     url: tabs[0].url,
//     name: "manual-dark-mode",
//     value: JSON.stringify(cookieVal)
//   })




browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});

// db.collection("Library").doc(doc_name.toString()).get({
//   nome: doc_name,
//   tema: doc_filter,
//   url: doc_url,
//   css: doc.css,
//   author: author.uid(),
//   time: firebase.timestamp.now()
// })