const menu = document.querySelector('#mobile_menu')
const menuLinks = document.querySelector('.barra_menu')

//Menu display mobile
const mobileMenu = () => {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);
  
//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if(window.innerWidth <= 960 && menuBars){
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }   
};
  
menuLinks.addEventListener('click', hideMobileMenu);
barra_logo.addEventListener('click', hideMobileMenu);