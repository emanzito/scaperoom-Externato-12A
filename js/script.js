let codes = JSON.parse(localStorage.getItem('codes')) || {
    math: false,
    portugues: false,
    psicologia: false,
    biologia: false,
    moral: false,
    educacao: false
};
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 60 * 60;
let timerInterval;

const puzzles = {
    math: {
        question: "Qual é a área de um triângulo com base 10 e altura 5?",
        type: "input",
        answer: "25"
    },
    portugues: {
        question: "Qual é o antónimo de 'alegre'?",
        type: "input",
        answer: "triste"
    },
    psicologia: {
        question: "Qual é o nome do efeito onde as pessoas seguem o grupo mesmo sabendo que está errado? (Dica: Asch)",
        type: "input",
        answer: "conformidade"
    },
    biologia: {
        question: "Qual é o órgão responsável pela respiração nos humanos?",
        type: "input",
        answer: "pulmões"
    },
    moral: {
        question: "O que significa 'empatia' em termos éticos?",
        type: "input",
        answer: "colocar-se no lugar do outro"
    },
    educacao: {
        question: "Num jogo de vólei, quantos pontos uma equipa precisa marcar para ganhar?",
        type: "input",
        answer: "25"
    }
};

function saveGame() {
    localStorage.setItem('codes', JSON.stringify(codes));
    localStorage.setItem('timeLeft', timeLeft);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        saveGame();
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("O tempo acabou! Tenta novamente.");
            restart();
        }
    }, 1000);
}

function enterRoom(subject) {
    window.location = `html/${subject}.html`;
}

function checkExit() {
    const allSolved = Object.values(codes).every(code => code);
    if (allSolved) {
        document.getElementById('exit').style.backgroundColor = 'green';
    }
}

function tryExit() {
    const allSolved = Object.values(codes).every(code => code);
    if (allSolved) {
        clearInterval(timerInterval);
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        localStorage.setItem('timeLeft', timeLeft);
        window.location = 'html/victory.html';
    } else {
        alert("Ainda não resolviste todos os enigmas!");
    }
}

function restart() {
    codes = {
        math: false,
        portugues: false,
        psicologia: false,
        biologia: false,
        moral: false,
        educacao: false
    };
    timeLeft = 60 * 60;
    localStorage.setItem('codes', JSON.stringify(codes));
    localStorage.setItem('timeLeft', timeLeft);
    window.location = 'index.html';
}

// Initialize
window.onload = function() {
    if (document.getElementById('timer')) {
        startTimer();
        checkExit();
    }
};