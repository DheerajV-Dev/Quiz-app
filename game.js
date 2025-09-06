const question = document.getElementById('question');
const choices= document.getElementsByClassName('choice-text');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion={};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "How to print hello world in alert box?",
        choice1: "msg('helloworld');",
        choice2: "alertbox('hello');",
        choice3: "alert('hello world');",
        choice4: "print('hello world');",
        answer: 3
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        choice1: "<img>",
        choice2: "<a>",
        choice3: "<link>",
        choice4: "<href>",
        answer: 2
    },
    {
        question: "Which of the following is a JavaScript data type?",
        choice1: "float",
        choice2: "number",
        choice3: "decimal",
        choice4: "real",
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer Style Sheets",
        choice2: "Creative Style System",
        choice3: "Cascading Style Sheets",
        choice4: "Colorful Style Syntax",
        answer: 3
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        choice1: "//",
        choice2: "/*",
        choice3: "#",
        choice4: "<!--",
        answer: 1
    },
    {
        question: "Which method is used to select an element by ID in JavaScript?",
        choice1: "getElementByClass",
        choice2: "getElementById",
        choice3: "querySelectorAll",
        choice4: "getElementsByTagName",
        answer: 2
    },
    {
        question: "Which property changes the text color in CSS?",
        choice1: "font-color",
        choice2: "color",
        choice3: "text-color",
        choice4: "background-color",
        answer: 2
    },
    {
        question: "Which HTML tag is used to display an image?",
        choice1: "<img>",
        choice2: "<picture>",
        choice3: "<src>",
        choice4: "<image>",
        answer: 1
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choice1: "var",
        choice2: "int",
        choice3: "float",
        choice4: "string",
        answer: 1
    },
    {
        question: "Which CSS property is used to set the background color?",
        choice1: "color",
        choice2: "background-color",
        choice3: "bgcolor",
        choice4: "background",
        answer: 2
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        choice1: "<h6>",
        choice2: "<h3>",
        choice3: "<h1>",
        choice4: "<header>",
        answer: 3
    },
    {
        question: "Which JavaScript method adds an item to the end of an array?",
        choice1: "push()",
        choice2: "pop()",
        choice3: "shift()",
        choice4: "unshift()",
        answer: 1
    },
    {
        question: "Which symbol is used for multi-line comments in JavaScript?",
        choice1: "//",
        choice2: "/* */",
        choice3: "#",
        choice4: "<!-- -->",
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a table row?",
        choice1: "<td>",
        choice2: "<tr>",
        choice3: "<th>",
        choice4: "<table>",
        answer: 2
    },
    {
        question: "Which CSS property controls the size of text?",
        choice1: "font-size",
        choice2: "text-size",
        choice3: "size",
        choice4: "font-style",
        answer: 1
    },
    {
        question: "Which JavaScript function parses a string to an integer?",
        choice1: "parseInt()",
        choice2: "parseFloat()",
        choice3: "Number()",
        choice4: "toString()",
        answer: 1
    },
    {
        question: "Which HTML tag is used to create a list item?",
        choice1: "<li>",
        choice2: "<ul>",
        choice3: "<ol>",
        choice4: "<item>",
        answer: 1
    },
    {
        question: "Which CSS property sets the space between lines of text?",
        choice1: "line-spacing",
        choice2: "line-height",
        choice3: "spacing",
        choice4: "text-spacing",
        answer: 2
    },
    {
        question: "Which JavaScript method removes the last item from an array?",
        choice1: "shift()",
        choice2: "pop()",
        choice3: "splice()",
        choice4: "remove()",
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a form?",
        choice1: "<input>",
        choice2: "<form>",
        choice3: "<button>",
        choice4: "<fieldset>",
        answer: 2
    }
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
   const questionIndex= Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

  Array.from(choices).forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion["choice" + number];
});
    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;

};
Array.from(choices).forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.classList.add(classToApply);

        // Highlight the correct answer if wrong was chosen
        if (classToApply === 'incorrect') {
            Array.from(choices).forEach(choiceEl => {
                if (choiceEl.dataset['number'] == currentQuestion.answer) {
                    choiceEl.classList.add('correct');
                }
            });
        }

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            Array.from(choices).forEach(choiceEl => {
                choiceEl.classList.remove('correct');
            });
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


startGame();