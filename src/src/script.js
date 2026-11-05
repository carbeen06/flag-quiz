import countries from "./data/countries.json";
import aliases from "./data/aliases.json";

// ---------- Elementos de la página ----------
const setup = document.getElementById("setup");
const quiz = document.getElementById("quiz");
const review = document.getElementById("review");
const results = document.getElementById("results");

const mode = document.getElementById("mode");
const startLetter = document.getElementById("start-letter");
const endLetter = document.getElementById("end-letter");
const continent = document.getElementById("continent");

const letterOptions = document.getElementById("letter-options");
const continentOptions = document.getElementById("continent-options");
const selectionInfo = document.getElementById("selection-info");
const startButton = document.getElementById("start-button");

const flag = document.getElementById("flag");
const answer = document.getElementById("answer");
const answerForm = document.getElementById("answer-form");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quitButton = document.getElementById("quit-button");
const reviewFlags = document.getElementById("review-flags");
const continueRoundButton = document.getElementById("continue-round-button");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const localFlagsPath = "/assets/flags";

// ---------- Estado del juego ----------
let queue = [];
let failed = [];
let currentCountry = null;
let round = 1;
let correctCount = 0;
let wrongCount = 0;
let totalCountries = 0;
let roundTotal = 0;
let answered = false;
let autoNextTimer = null;
let timerInterval = null;
let roundStartTime = 0;
let roundTimes = [];
let pendingRound = [];

// ---------- Utilidades ----------

// Quita mayúsculas, tildes y espacios sobrantes.
function normalize(text) {
    return text
        .trim()
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

// Comprueba el nombre principal y sus alternativas.
function isCorrectAnswer(input, country) {
    const given = normalize(input);
    const mainName = normalize(country.name);
    const acceptedNames = [mainName, ...(aliases[mainName] || [])];

    return acceptedNames.some(name => normalize(name) === given);
}

// Mezcla una lista aleatoriamente (Fisher-Yates).
function shuffle(list) {
    const shuffled = [...list];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

const timerElement = document.getElementById("timer");

// Convierte milisegundos a formato mm:ss.
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function startRoundTimer() {
    stopTimer();
    roundStartTime = Date.now();
    timerElement.textContent = `⏱ ${formatTime(0)}`;

    timerInterval = setInterval(() => {
        timerElement.textContent =
            `⏱ ${formatTime(Date.now() - roundStartTime)}`;
    }, 250);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Rellena los selectores de letras.
letters.forEach(letter => {
    startLetter.add(new Option(letter, letter));
    endLetter.add(new Option(letter, letter));
});

startLetter.value = "A";
endLetter.value = "D";

// ---------- Pantalla de selección ----------

function updateMode() {
    letterOptions.classList.toggle("hidden", mode.value !== "letters");
    continentOptions.classList.toggle("hidden", mode.value !== "continent");
    updateSelectionInfo();
}

function getSelectedCountries() {
    if (mode.value === "all") {
        return [...countries];
    }

    if (mode.value === "continent") {
        if (continent.value === "all") {
            return [...countries];
        }
        return countries.filter(c => c.continent === continent.value);
    }

    const start = startLetter.value;
    const end = endLetter.value;

    if (start > end) {
        return [];
    }

    return countries.filter(country => {
        const firstLetter = normalize(country.name).charAt(0).toUpperCase();
        return firstLetter >= start && firstLetter <= end;
    });
}

function updateSelectionInfo() {
    const selected = getSelectedCountries();

    if (mode.value === "letters" && startLetter.value > endLetter.value) {
        selectionInfo.textContent =
            "La letra inicial debe ser anterior a la final.";
        startButton.disabled = true;
        return;
    }

    selectionInfo.textContent =
        `${selected.length} países incluidos en este quiz.`;
    startButton.disabled = selected.length === 0;
}

function showScreen(screen) {
    setup.classList.toggle("hidden", screen !== "setup");
    quiz.classList.toggle("hidden", screen !== "quiz");
    review.classList.toggle("hidden", screen !== "review");
    results.classList.toggle("hidden", screen !== "results");
}

// ---------- Lógica del quiz ----------

function startQuiz() {
    const selected = getSelectedCountries();

    if (selected.length === 0) {
        return;
    }

    clearTimeout(autoNextTimer);

    queue = shuffle(selected);
    failed = [];
    currentCountry = null;
    round = 1;
    correctCount = 0;
    wrongCount = 0;
    answered = false;
    pendingRound = [];

    totalCountries = selected.length;
    roundTotal = queue.length;
    roundTimes = [];

    showScreen("quiz");
    startRoundTimer();
    showQuestion();
}

function showQuestion() {
    if (queue.length === 0) {
        finishRound();
        return;
    }

    clearTimeout(autoNextTimer);

    currentCountry = queue[0];
    answered = false;

    flag.src = `${localFlagsPath}/${currentCountry.code}.svg`;
    flag.alt = "Bandera para identificar";
    flag.onerror = () => {
        flag.alt = "No se pudo cargar esta bandera";
        feedback.className = "feedback incorrect";
        feedback.textContent = "No se ha podido cargar la bandera local. Inténtalo de nuevo.";
        feedback.classList.remove("hidden");
    };

    answer.value = "";
    answer.disabled = false;

    feedback.className = "feedback hidden";
    feedback.textContent = "";

    answerForm.classList.remove("hidden");
    nextButton.classList.add("hidden");

    document.getElementById("progress").textContent =
        `Pregunta ${roundTotal - queue.length + 1} de ${roundTotal}`;

    document.getElementById("progress-bar").style.width =
        `${((roundTotal - queue.length) / roundTotal) * 100}%`;

    document.getElementById("score").textContent =
        `${correctCount} aciertos`;

    document.getElementById("round-info").textContent =
        round === 1
            ? "Ronda inicial: intenta recordar todos los países."
            : `Ronda de repaso ${round}: repetimos las que has fallado.`;

    answer.focus();
}

function goToNext() {
    if (!answered) return;
    clearTimeout(autoNextTimer);
    queue.shift();
    showQuestion();
}

answerForm.addEventListener("submit", event => {
    event.preventDefault();

    if (answered || !currentCountry) {
        return;
    }

    if (answer.value.trim() === "") {
        answer.focus();
        return;
    }

    const isCorrect = isCorrectAnswer(answer.value, currentCountry);

    answered = true;
    feedback.classList.remove("hidden");

    if (isCorrect) {
        correctCount++;
        feedback.className = "feedback correct";
        feedback.textContent = "¡Correcto! 🎉";

        // Si aciertas, pasa sola a la siguiente.
        autoNextTimer = setTimeout(goToNext, 800);
    } else {
        wrongCount++;
        failed.push(currentCountry);

        feedback.className = "feedback incorrect";
        feedback.textContent =
            `Incorrecto. La respuesta correcta era: ${currentCountry.name}.`;

        // Si fallas, esperas a que pulses el botón (o Enter).
        nextButton.classList.remove("hidden");
    }

    document.getElementById("score").textContent =
        `${correctCount} aciertos`;
});

nextButton.addEventListener("click", goToNext);
continueRoundButton.addEventListener("click", continueRound);

// Termina la ronda y prepara otra con los fallos.
function finishRound() {
    stopTimer();

    roundTimes.push({
        round,
        ms: Date.now() - roundStartTime,
        questions: roundTotal,
        failed: failed.length
    });

    if (failed.length > 0) {
        pendingRound = shuffle(failed);
        failed = [];

        round++;
        showReview();
        return;
    }

    showResults();
}

function showReview() {
    reviewFlags.innerHTML = pendingRound
        .map(country => `
            <article class="review-flag">
                <img
                    src="${localFlagsPath}/${country.code}.svg"
                    alt="Bandera de ${country.name}"
                >
                <strong>${country.name}</strong>
            </article>
        `)
        .join("");

    showScreen("review");
    continueRoundButton.focus();
}

function continueRound() {
    queue = pendingRound;
    pendingRound = [];
    roundTotal = queue.length;

    startRoundTimer();
    showScreen("quiz");
    showQuestion();
}

function showResults() {
    showScreen("results");

    const totalMs = roundTimes.reduce((sum, r) => sum + r.ms, 0);

    const roundsHtml = roundTimes
        .map(r => `
            <div>
                Ronda ${r.round}: <strong>${formatTime(r.ms)}</strong>
                · ${r.questions} banderas · ${r.failed} fallos
            </div>
        `)
        .join("");

    document.getElementById("result-message").textContent =
        "¡Has conseguido acertar todas las banderas!";

    document.getElementById("result-stats").innerHTML = `
        <div>🌍 Países estudiados: <strong>${totalCountries}</strong></div>
        <div>✅ Aciertos acumulados: <strong>${correctCount}</strong></div>
        <div>❌ Fallos acumulados: <strong>${wrongCount}</strong></div>
        <div>🔁 Rondas completadas: <strong>${round}</strong></div>
        <div>⏱ Tiempo total: <strong>${formatTime(totalMs)}</strong></div>
        <hr>
        ${roundsHtml}
    `;
}

function backToSetup() {
    clearTimeout(autoNextTimer);
    stopTimer();
    pendingRound = [];
    showScreen("setup");
    updateSelectionInfo();
}

// ---------- Eventos ----------
document.getElementById("restart-button").addEventListener("click", backToSetup);
quitButton.addEventListener("click", backToSetup);

mode.addEventListener("change", updateMode);
startLetter.addEventListener("change", updateSelectionInfo);
endLetter.addEventListener("change", updateSelectionInfo);
continent.addEventListener("change", updateSelectionInfo);

startButton.addEventListener("click", startQuiz);

// Estado inicial.
updateMode();