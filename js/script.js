let codes = JSON.parse(localStorage.getItem('codes')) || {
    mosteiro: false, basto: false, senhorinha: false,
    romaria: false, jogopau: false, tamega: false, cabreira: false,
    math: false, portugues: false, biologia: false,
    educacao: false, psicologia: false, moral: false
};
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 12 * 60;
let timerInterval;

// Frase final: "BASTO É TERRA DE TRADIÇÃO VIVA E HISTÓRIA"
const puzzleWords = {
    mosteiro:  { word: "BASTO",    order: 1 },
    basto:     { word: "É",        order: 2 },
    senhorinha:{ word: "TERRA",    order: 3 },
    romaria:   { word: "DE",       order: 4 },
    jogopau:   { word: "TRADIÇÃO", order: 5 },
    tamega:    { word: "VIVA",     order: 6 },
    cabreira:  { word: "E",        order: 7 },
    math:      { word: "HISTÓRIA", order: 8 },
    portugues: { word: "DE",       order: 9 },
    biologia:  { word: "UM",       order: 10 },
    educacao:  { word: "POVO",     order: 11 },
    psicologia:{ word: "COM",      order: 12 },
    moral:     { word: "ALMA",     order: 13 }
};
// Frase completa: BASTO É TERRA DE TRADIÇÃO VIVA E HISTÓRIA DE UM POVO COM ALMA

const FINAL_PHRASE = "BASTO É TERRA DE TRADIÇÃO VIVA E HISTÓRIA DE UM POVO COM ALMA";

const puzzles = {
    mosteiro: {
        question: "Como se chama o mosteiro mais famoso de Cabeceiras de Basto, localizado em Refojos (escreve o nome completo, não abreviações como S.)?",
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
        answer: "Serra da Cabreira"
    },
    math: {
        question: "Se tens 20 rebuçados e comes metade, quantos ficam?",
        answer: "10"
    },
    portugues: {
        question: "Qual é o plural de 'cão'?",
        answer: "Cães"
    },
    biologia: {
        question: "Qual é o órgão que bombeia o sangue no corpo humano?",
        answer: "Coração"
    },
    educacao: {
        question: "Quantos jogadores tem uma equipa de futebol em campo?",
        answer: "11"
    },
    psicologia: {
        question: "Como se chama o estudo que estuda a mente e os comportamentos humanos?",
        answer: "Psicologia"
    },
    moral: {
        question: "Completa o ditado: \"Faz o bem sem olhar a...\"",
        answer: "Quem"
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
        const timerEl = document.getElementById('timer');
        if (!timerEl) return;
        timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        if (timeLeft <= 120) timerEl.classList.add('warning');
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("O tempo acabou! Tenta novamente.");
            restart();
        }
    }, 1000);
}

function enterRoom(subject) {
    window.location = `${subject}.html`;
}

function tryExit() {
    const allSolved = Object.values(codes).every(c => c);
    if (allSolved) {
        clearInterval(timerInterval);
        localStorage.setItem('timeLeft', timeLeft);
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

        // show word reveal
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
    window.location = 'pagina-inicial.html';
}

function restart() {
    codes = {
        mosteiro: false, basto: false, senhorinha: false,
        romaria: false, jogopau: false, tamega: false, cabreira: false,
        math: false, portugues: false, biologia: false,
        educacao: false, psicologia: false, moral: false
    };
    timeLeft = 12 * 60;
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
