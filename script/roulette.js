import {getMoney, moneyCalculation} from "./navbar.js";
import {createElementFromHTML} from "./global.js";

let i = 1;
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

const refreshCheck = () => {
    document.querySelector('.check').innerHTML = '';
}

playBtn.addEventListener('click', () =>{
    const userBet = document.querySelector('.user-bet').value;

    if(userBet > getMoney() || isNaN(userInput) || userBet < 1){
        document.querySelector('.check').innerHTML = '';
        const str = createErrorCheckTemplate();
        const elem = createElementFromHTML(str);
        document.querySelector('.check').append(elem);

        playBtn.setAttribute('disabled', 'disabled');
        setTimeout(enableBtn, 2000);

        setTimeout(refreshCheck, 2000);
    }else{
        const audio = new Audio();
        audio.src = '../audio/wheel.mp3'
        audio.autoplay = true;

        getCheck(userInput, userBet);

        playBtn.setAttribute('disabled', 'disabled');
        setTimeout(enableBtn, 3000);
    }

})

const enableBtn = () => {
    playBtn.removeAttribute('disabled');
}

function getCheck(userInput, userBet){

    const randomNumber = Math.floor(Math.random() * 37);
    const randomSpins = Math.floor(Math.random() * (11 - 6)) + 6;

    const inputNumbers = [0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36, 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    const randomNumbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    userInput = inputNumbers[userInput - 1];

    document.querySelector('.circle').style.transform = `rotate(${(randomNumbers.indexOf(randomNumber) * 9.73) + (360 * randomSpins * i)}deg) translateY(-125px)`;

    if(userInput === randomNumber && userBet <= getMoney() && !isNaN(userInput) && userBet >= 1){
        setTimeout(getTrueCheck, 3000, userBet);
    }else{
        setTimeout(getFalseCheck, 3000, randomNumber, userBet);

    }

    i++;
}

const getFalseCheck = (randomNumber, userBet) => {
    document.querySelector('.check').innerHTML = '';
    const str = createFalseCheckTemplate(randomNumber, userBet);
    const elem = createElementFromHTML(str);
    document.querySelector('.check').append(elem);

    moneyCalculation(-userBet);

    setTimeout(refreshCheck, 2000);
}

const getTrueCheck = (userBet) => {
    document.querySelector('.check').innerHTML = '';
    const str = createTrueCheckTemplate(userBet);
    const elem = createElementFromHTML(str);
    document.querySelector('.check').append(elem);

    moneyCalculation(userBet * 35);

    const audio = new Audio();
    audio.src = '../audio/win.mp3'
    audio.autoplay = true;

    setTimeout(refreshCheck, 2000);
}

const createTrueCheckTemplate = (userBet) => `
<p class="check-answer">You win! You get ${userBet * 35} caps!</p>
`

const createFalseCheckTemplate = (randomNumber, userBet) => `
<p class="check-answer">You lose! dropped out number ${randomNumber}, You lost ${userBet} caps!</p>
`

const createErrorCheckTemplate = () => `
<p class="check-answer">Your bet exceeds the number of your caps, the bet is less than 1 or you have not entered a bet</p>
`
