import {moneyCalculation} from "./navbar.js";
const acceptAnswerInput = document.querySelector('.user-answer');
const acceptAnswerBtn = document.querySelector('.accept-answer');
const nextQuestionBtn = document.querySelector('.next-question');
let question;
let answer;

async function main(){
    const response = await fetch('http://jservice.io/api/random?count=1');
    const result = await response.json();

    question = result[0].question;
    answer = result[0].answer.replace(/<\/*i>/gi,"");

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
    main();
})

export const createElementFromHTML = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};

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