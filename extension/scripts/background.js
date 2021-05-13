function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    // get any previously set cookie for the current tab 
    var gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "manual-dark-mode"
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.insertCSS({ allFrames: true, code: cookieVal.cssCode })
          .then(null, error => console.log(error));
      }
    });
  });
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
