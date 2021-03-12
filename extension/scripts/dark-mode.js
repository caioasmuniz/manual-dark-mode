const addStyle = (() => {
  const style = document.createElement('style');
  document.head.append(style);
  return (styleString) => style.textContent = styleString;
})();


browser.storage.local.set({ teste: true })
browser.storage.local.get()
  .then((item) => console.log(item), (error) => console.log(error))

// document.onload(addStyle('body{ color: blue; border:5px solid red}'))