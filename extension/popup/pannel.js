const buttonSet = document.getElementById('set');
const buttonReset = document.getElementById('reset');

let cookieVal = {
  cssCode: ' #barra-brasil {  background: #131313;}#header {background-color: #131313;}#sobre {  background: #292727;}body {  background-color: #131313;  color: rgb(190, 185, 185);}#main {background: #131313;}.portletNavigationTree > .portletItem a span,.item-central .link-central {  color: rgb(190, 185, 185);}.portletNavigationTree .portletHeader {  cursor: pointer;  background: #292727 url(../img/portlet-header.gif) no-repeat 96% 0.7em;  background-size: 18px auto;}.portletNavigationTree .portletHeader.ativo {  background: #292727 url(../img/portlet-header-expanded.gif) no-repeat 96%    0.7em;  background-size: 18px auto;}.azul-claro .outstanding-header {  background: #292727;}.verde .outstanding-header {  background: #292727;}.laranja .outstanding-header {  background: #292727;}.azul-claro .outstanding-header .outstanding-title {  background: #292727;}.verde .outstanding-header .outstanding-title {background: #292727;}.laranja .outstanding-header .outstanding-title {background: #292727;}#em-destaque li {  border-right: 1px solid rgb(190, 185, 185);  background-color: #292727;}.azul-claro .outstanding-header .outstanding-title {background: #292727;}.tile p {  color: rgb(190, 185, 185);}.azul-claro .outstanding-header {  background: #292727;}#portal-footer {  background: #131313;}ul.css-tabs li.current {  background-color: #292727;  color: rgb(190, 185, 185);}ul.css-tabs li {  border: 1px solid #292727;  background-color: #292727;  color: rgb(190, 185, 185);}.css-panes .pane {  border: 1px solid #292727;  background-color: #292727;}#footer {  background: #292727;}#doormat-container {background: #292727;}#wrapper #footer .footer-logos {  background: #131313;} '
};

function getActiveTab() { return browser.tabs.query({ active: true, currentWindow: true }) }

buttonSet.onclick = (e, ev) => {
  getActiveTab()
    .then((tabs) => {
      let sending = browser.runtime.sendMessage({ command: "get-theme", url: tabs[0].url })
      sending.then((response) => {
        console.log("RESPONSE: " + response)
        // browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
        // browser.cookies.set({
        //   url: tabs[0].url,
        //   name: "manual-dark-mode",
        //   value: JSON.stringify(cookieVal)
        // })
      }, (error) => { console.log("ERRO: " + error) })


      // browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
      //   .then(null, error => console.log(error));

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