const navHamburgerBtn = document.querySelector('.nav-hamburger > button');
const navCloseBtn = document.querySelector('.nav-close > button');
let _money = 100;

import {createElementFromHTML} from "./quiz.js";

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

const renderMoney = (money) => {
    document.querySelector('.money').innerHTML = '';
    const str = getMoneyTemplate(money);
    const elem = createElementFromHTML(str);
    document.querySelector('.money').append(elem);
}

const getMoneyTemplate = (money) => `
<p class="money">${money}</p>
`

export const moneyCalculation = (calc) => {
    const money = setMoney(getMoney() + calc);
    renderMoney(money);
}

const getMoney = () => {
    return _money;
}

const setMoney = (amount) => {
    _money = amount;
    return _money;
}


