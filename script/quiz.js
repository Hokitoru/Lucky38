import {moneyCalculation} from "./navbar.js";
import {createElementFromHTML} from './global.js'
const acceptAnswerInput = document.querySelector('.user-answer');
const acceptAnswerBtn = document.querySelector('.accept-answer');
const nextQuestionBtn = document.querySelector('.next-question');
let question;
let answer;

async function main(){
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const result = await response.json();

    question = result.results[0].question;
    answer = result.results[0].correct_answer.replace(/<\/*i>/gi,"");

    renderQuestion(question);
}

acceptAnswerBtn.addEventListener('click', () =>{
    renderCheck(answer);
    answer = '';
})

acceptAnswerInput.addEventListener('keypress', (keyboard) =>{
    const keyName = 'Enter';
    if(keyName === keyboard.key){
        renderCheck(answer);
        answer = '';
    }
})

nextQuestionBtn.addEventListener('click', () => {
    document.querySelector('.check-answer').innerHTML = '';
    document.querySelector('.user-answer').value = '';
    main();
})

const createTrueCheckTemplate = () => `
<p class="check-answer">Correct answer! You get 50 caps!</p>
`

const createFalseCheckTemplate = (answer) => `
<p class="check-answer">Wrong answer! The correct answer is: ${answer}</p>
`

const createSecondCheckTemplate = () => `
<p class="check-answer">Not</p>
`

const createQuestionTemplate = (question) => `
<p class="question">${question}</p>
`

const renderCheck = (answer) => {
    document.querySelector('.check-answer').innerHTML = '';
    const userAnswer = document.querySelector('.user-answer').value;

    let str;
    if(userAnswer.toLowerCase().replace(/[\s()'"/.,-=+]/g, "") === answer.toLowerCase().replace(/[\s()'"/.,-=+]/g, "")){
        str = createTrueCheckTemplate();
        const audio = new Audio();
        audio.src = '../audio/win.mp3'
        audio.autoplay = true;
        moneyCalculation(50);
    } else if(answer === ""){
        str = createSecondCheckTemplate();
    } else{
        str = createFalseCheckTemplate(answer);
    }

    const elem = createElementFromHTML(str);
    document.querySelector('.check-answer').append(elem);
}

const renderQuestion = (question) => {
    document.querySelector('.question').innerHTML = '';
    const str = createQuestionTemplate(question);
    const elem = createElementFromHTML(str);
    document.querySelector('.question').append(elem);
}

main();