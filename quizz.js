const questions = [
    {
        type: "four",
        question: "Quand avons-nous commencé à nous parler ?",
        answers: [
            { text: "2019", correct: false },
            { text: "2020", correct: false },
            { text: "2021", correct: true },
            { text: "2022", correct: false }
        ]
    },
    {
        type: "two",
        question: "Est-ce que je t’ai envoyé le premier message ?",
        answers: [
            { text: "OUI", correct: true },
            { text: "NON", correct: false }
        ]
    },
    {
        type: "four",
        question: "Notre premier voyage ensemble était où ?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Lyon", correct: false },
            { text: "Nice", correct: false },
            { text: "Marseille", correct: false }
        ]
    },
    {
        type: "two",
        question: "On s’est rencontrés grâce à un ami ?",
        answers: [
            { text: "OUI", correct: false },
            { text: "NON", correct: true }
        ]
    },
    {
        type: "four",
        question: "Quel est notre plat préféré ensemble ?",
        answers: [
            { text: "Pizza", correct: true },
            { text: "Sushi", correct: false },
            { text: "Burger", correct: false },
            { text: "Pâtes", correct: false }
        ]
    },
    {
        type: "two",
        question: "On a déjà regardé une série entière en un week-end ?",
        answers: [
            { text: "OUI", correct: true },
            { text: "NON", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const correctSound = document.getElementById("correctSound");

/* 🔊 BAISSE DU VOLUME */
correctSound.volume = 0.3; // 30% du volume

function loadQuestion() {

    if (currentQuestion >= questions.length) {
        showFinalScreen();
        return;
    }

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    progressEl.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;

    answersEl.innerHTML = "";
    answersEl.className = "answers " + q.type;

    const colors = ["red", "blue", "yellow", "green"];

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");
        button.classList.add("answer-btn", colors[index]);
        button.textContent = answer.text;

        button.addEventListener("click", () => handleAnswer(button, q.answers));

        answersEl.appendChild(button);
    });
}

function handleAnswer(clickedButton, answers) {

    const allButtons = document.querySelectorAll(".answer-btn");
    const isCorrect = answers.find(a => a.text === clickedButton.textContent).correct;

    /* 🔒 Désactiver tout */
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add("disabled");
    });

    /* 🎯 Montrer bonne réponse */
    allButtons.forEach(btn => {
        const answerData = answers.find(a => a.text === btn.textContent);

        if (answerData.correct) {
            btn.classList.remove("disabled");
            btn.classList.add("correct");
        }
    });

    /* ❌ Si mauvaise */
    if (!isCorrect) {
        clickedButton.classList.remove("disabled");
        clickedButton.classList.add("wrong");
    } else {
        score++;
        correctSound.currentTime = 0;
        correctSound.play();
    }

    scoreEl.textContent = "Score : " + score;

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1700);
}

function showFinalScreen() {
    questionEl.textContent = `🎉 Quiz terminé ! Score final : ${score} / ${questions.length}`;
    answersEl.innerHTML = "";
    progressEl.textContent = "";
}

loadQuestion();
