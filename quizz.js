const questions = [
    {
        type: "four",
        question: "De quand date le premier appel ?",
        answers: [
            { text: "25 février 2025", correct: true },
            { text: "22 février 2025", correct: false },
            { text: "21 février 2025", correct: false },
            { text: "24 février 2025", correct: false }
        ]
    },
    {
        type: "two",
        question: "Notre premiere rencontre était au parc Clemenceau",
        answers: [
            { text: "OUI", correct: false },
            { text: "NON", correct: true }
        ]
    },
    {
        type: "four",
        question: "Notre premiere bouffe ensemble ?",
        answers: [
            { text: "Pepe Chicken", correct: false },
            { text: "Tacos", correct: false },
            { text: "Tracteur", correct: false },
            { text: "Sushis", correct: true }
        ]
    },
    {
        type: "two",
        question: "Le film qu'on a regardé a la défense était : A la poursuite du Pere Noel",
        answers: [
            { text: "OUI", correct: true },
            { text: "NON", correct: false }
        ]
    },
    {
        type: "2",
        question: "Ton tout premier cadeau était Alex ?",
        answers: [
            { text: "OUI", correct: true },
            { text: "NON", correct: false }
        ]
    },
    {
        type: "four",
        question: "Quelle phrase je n'ai PAS dit ?",
        answers: [
            { text: "Jvais slay la place wouldi", correct: false },
            { text: "Je suis un poussin tfacon", correct: true },
            { text: "50/50 c'est honnête de bz nous fait pas la michto stp", correct: false },
            { text: "Vasy envoi tes pieds pour prouver que tes folle", correct: false }
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
