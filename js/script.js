let codes = JSON.parse(localStorage.getItem('codes')) || {
    mosteiro: false, basto: false, senhorinha: false,
    romaria: false, jogopau: false, tamega: false, cabreira: false,
    math: false, portugues: false, biologia: false,
    educacao: false, psicologia: false, moral: false
};

// Timer: lê sempre do localStorage para persistir entre páginas
let timeLeft = parseInt(localStorage.getItem('timeLeft'));
if (isNaN(timeLeft) || timeLeft <= 0) timeLeft = 20 * 60;

let timerInterval;

// Frase final: BASTO É TERRA DE TRADIÇÃO VIVA E HISTÓRIA DE UM POVO COM ALMA
const puzzleWords = {
    mosteiro:   { word: "BASTO",    order: 1 },
    basto:      { word: "É",        order: 2 },
    senhorinha: { word: "TERRA",    order: 3 },
    romaria:    { word: "DE",       order: 4 },
    jogopau:    { word: "TRADIÇÃO", order: 5 },
    tamega:     { word: "VIVA",     order: 6 },
    cabreira:   { word: "E",        order: 7 },
    math:       { word: "HISTÓRIA", order: 8 },
    portugues:  { word: "DE",       order: 9 },
    biologia:   { word: "UM",       order: 10 },
    educacao:   { word: "POVO",     order: 11 },
    psicologia: { word: "COM",      order: 12 },
    moral:      { word: "ALMA",     order: 13 }
};

const FINAL_PHRASE = "BASTO É TERRA DE TRADIÇÃO VIVA E HISTÓRIA DE UM POVO COM ALMA";

const puzzles = {
    mosteiro: {
        question: "Como se chama o mosteiro mais famoso de Cabeceiras de Basto, localizado em Refojos?",
        answer: "Mosteiro de São Miguel de Refojos"
    },
    basto: {
        question: "O que representa a estátua do Basto, símbolo da vila, na Praça da República?",
        answer: "Guerreiro lusitano"
    },
    senhorinha: {
        question: "Qual é o nome da santa padroeira de Basto, cuja festa remonta à fundação de Portugal?",
        answer: "Santa Senhorinha"
    },
    romaria: {
        question: "A maior romaria de Cabeceiras de Basto celebra qual santa?",
        answer: "Nossa Senhora dos Remédios"
    },
    jogopau: {
        question: "Qual é a arte marcial tradicional de Cabeceiras de Basto, inscrita no Património Cultural Imaterial em 2023?",
        answer: "Jogo do Pau"
    },
    tamega: {
        question: "Qual é o nome do rio que banha Cabeceiras de Basto?",
        answer: "Tâmega"
    },
    cabreira: {
        question: "Qual é o nome da serra que envolve Cabeceiras de Basto a norte?",
        answer: "Cabreira"
    },
    math: {
        question: "Qual é o resultado de 15² - 100?",
        answer: "125"
    },
    portugues: {
        question: "Identifica a figura de estilo em: 'O sol é um disco de ouro'.",
        answer: "Metáfora"
    },
    biologia: {
        question: "Como se chama o processo pelo qual as plantas produzem o seu alimento usando luz solar?",
        answer: "Fotossíntese"
    },
    educacao: {
        question: "Quantos sets sao necessários para ganhar um jogo de voleibol?",
        answer: "25"
    },
    psicologia: {
        question: "Como se chama o estudo que estuda a mente e os comportamentos humanos?",
        answer: "Psicologia"
    },
    moral: {
        question: "Qual é o filósofo grego que afirmou 'Só sei que nada sei'?",
        answer: "Sócrates"
    }
};

function saveGame() {
    localStorage.setItem('codes', JSON.stringify(codes));
    localStorage.setItem('timeLeft', timeLeft);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    if (timeLeft <= 120) timerEl.classList.add('warning');
    else timerEl.classList.remove('warning');
}

function startTimer() {
    // Mostra valor atual imediatamente
    updateTimerDisplay();
    // Limpa qualquer interval anterior
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        saveGame();
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("O tempo acabou! Tenta novamente.");
            restart();
        }
    }, 1000);
}

function enterRoom(subject) {
    // Guarda o tempo antes de sair
    saveGame();
    window.location = `${subject}.html`;
}

function tryExit() {
    const allSolved = Object.values(codes).every(c => c);
    if (allSolved) {
        clearInterval(timerInterval);
        saveGame();
        window.location = 'saida.html';
    } else {
        const remaining = Object.entries(codes).filter(([,v]) => !v).length;
        alert(`Ainda faltam ${remaining} enigma(s) por resolver!`);
    }
}

function getCollectedWords() {
    return Object.entries(puzzleWords)
        .filter(([subject]) => codes[subject])
        .sort((a, b) => a[1].order - b[1].order)
        .map(([, data]) => data.word);
}

function submitAnswer(subject) {
    const input = document.getElementById('answer-input');
    const feedback = document.getElementById('feedback');
    const answer = input.value.trim().toLowerCase();
    const correct = puzzles[subject].answer.toLowerCase();

    if (codes[subject]) {
        feedback.textContent = 'Já resolveste este enigma!';
        feedback.className = 'already';
        return;
    }
    if (answer === correct) {
        codes[subject] = true;
        saveGame();
        const word = puzzleWords[subject].word;
        feedback.innerHTML = `✓ Correto! Palavra obtida: <strong>${word}</strong>`;
        feedback.className = 'correct';
        input.disabled = true;
        const reveal = document.getElementById('word-reveal');
        if (reveal) {
            reveal.textContent = word;
            reveal.style.opacity = '1';
        }
    } else {
        feedback.textContent = '✗ Resposta incorreta. Tenta novamente.';
        feedback.className = 'wrong';
        input.value = '';
        input.focus();
    }
}

function backToMap() {
    saveGame();
    window.location = 'pagina-inicial.html';
}

function restart() {
    codes = {
        mosteiro: false, basto: false, senhorinha: false,
        romaria: false, jogopau: false, tamega: false, cabreira: false,
        math: false, portugues: false, biologia: false,
        educacao: false, psicologia: false, moral: false
    };
    timeLeft = 20 * 60;
    localStorage.setItem('codes', JSON.stringify(codes));
    localStorage.setItem('timeLeft', timeLeft);
    window.location.href = 'pagina-inicial.html';
}

window.onload = function() {
    if (document.getElementById('timer')) {
        startTimer();
        if (typeof updateDots === 'function') updateDots();
    }
};
