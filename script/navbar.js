const navHamburgerBtn = document.querySelector('.nav-hamburger > button');
const navCloseBtn = document.querySelector('.nav-close > button');

function onNavBtnClick(){
    document.querySelector('.navbar').classList.toggle('navbar-adaptive');
    document.querySelector('.nav-hamburger').classList.toggle('nav-hamburger-invisible');
    document.querySelector('.balance').classList.toggle('balance-invisible');
    document.querySelector('.nav-close').classList.toggle('nav-close-visible');
    document.body.classList.toggle('hide-overflow');
    document.querySelector('.nav-items').classList.toggle('nav-items-adaptive');
    document.querySelector('nav').classList.toggle('col');
    document.querySelector('.nav-items > div:last-child').classList.toggle('games-visible');
}

navHamburgerBtn.addEventListener('click', onNavBtnClick);
navCloseBtn.addEventListener('click', onNavBtnClick);