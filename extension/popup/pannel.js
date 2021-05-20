const buttonSet = document.getElementsByClassName("theme-button");
const buttonReset = document.getElementById('reset');
const themeList = document.getElementById('theme-list');

let themesData;

function getActiveTab() { return browser.tabs.query({ active: true, currentWindow: true }) }


window.onload = (e, ev) => {
  getActiveTab().then((tabs) => {
    let sending = browser.runtime.sendMessage({ command: "get-theme", url: tabs[0].url })
    sending.then((response) => {
      let themes = response.response;
      themes.forEach(theme => {
        let themeButton = document.createElement("button")
        themeButton.appendChild(document.createTextNode(theme.nome))
        themeButton.className = "theme-button";
        themeButton.id = theme.id;
        themesData = themes;
        themeList.appendChild(themeButton)
      })
    })
  })
}

document.onclick = (ev) => {
  if (ev.target.className == "theme-button") {
    let themeInfo = themesData.find(val => (ev.target.id == val.id ? val : undefined))

    browser.cookies.set({
      name: "manual-dark-mode",
      // url: themeInfo.url,
      value: JSON.stringify(themeInfo.css),
      url: themeInfo.url
    })
      .then((cookie) => { console.log(cookie) }, (error) => { console.log(error) })

    browser.tabs.insertCSS({ allFrames: true, code: JSON.stringify(themeInfo.css) })
      .then((cookie) => {
        browser.tabs.reload()
      }, error => console.log(error));
  }
}

buttonReset.onclick = (e, ev) => {
  getActiveTab().then((tabs) => {
    browser.cookies.get({
      url: tabs[0].url,
      name: "manual-dark-mode"
    }).then((cookie) => {
      browser.tabs.removeCSS({ allFrames: true, code: JSON.stringify(cookie.value) })
        .then(() => {
          browser.cookies.remove({ url: tabs[0].url, name: "manual-dark-mode" })
            .then(() => browser.tabs.reload())
        })
    })
  })
}

// browser.cookies.onChanged.addListener((changeInfo) => {
//   console.log(`Cookie changed:\n
//               * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
//               * Cause: ${changeInfo.cause}\n
//               * Removed: ${changeInfo.removed}`);
// });