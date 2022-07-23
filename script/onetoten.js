import {getMoney, moneyCalculation} from "./navbar.js";
import {createElementFromHTML} from './global.js'


const betNumberBtn = document.querySelectorAll('.bet > div > button');
const playBtn = document.querySelector('.play-button');
let userInput;

for (let i = 0; i < betNumberBtn.length; i++) {
    betNumberBtn[i].addEventListener("click", () => {
        userInput = i + 1;
        for(let j = 0; j < betNumberBtn.length; j++){
            if(i === j){
                betNumberBtn[j].classList.add('active');
            }else{
                betNumberBtn[j].classList.remove('active');
            }
        }
    })
}

playBtn.addEventListener('click', () =>{
    const userBet = document.querySelector('.user-bet').value;
    getCheck(userInput, userBet);
})

function getCheck(userInput, userBet){
    const randomNumber = Math.floor(Math.random() * (11 - 1)) + 1;
    renderCheck(userBet, userInput, randomNumber);
}

const createTrueCheckTemplate = (userBet) => `
<p class="check-answer">You win! You get ${userBet * 10} caps!</p>
`

const createFalseCheckTemplate = (randomNumber, userBet) => `
<p class="check-answer">You lose! dropped out number ${randomNumber}, You lost ${userBet} caps!</p>
`

const createErrorCheckTemplate = () => `
<p class="check-answer">Your bet exceeds the number of your caps, the bet is less than 1 or you have not entered a bet</p>
`

let timeout = null;

const renderCheck = (userBet, userInput, randomNumber) => {
    clearTimeout(timeout);
    document.querySelector('.check').innerHTML = '';

    let str;
    if (userInput === randomNumber && userBet <= getMoney() && !isNaN(userInput) && userBet >= 1){
        str = createTrueCheckTemplate(userBet);
        const audio = new Audio();
        audio.src = '../audio/win.mp3'
        audio.autoplay = true;
        moneyCalculation(userBet * 10);
    }else if(userBet > getMoney() || isNaN(userInput) || userBet < 1){
        str = createErrorCheckTemplate();
    }else{
        str = createFalseCheckTemplate(randomNumber, userBet);
        moneyCalculation(-userBet);
    }
    const elem = createElementFromHTML(str);
    document.querySelector('.check').append(elem);
    timeout = setTimeout(refreshCheck, 2000);
}

const refreshCheck = () => {
    document.querySelector('.check').innerHTML = '';
}