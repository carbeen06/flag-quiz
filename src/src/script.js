import countries from "./data/countries.json";
import aliases from "./data/aliases.json";
import translations from "./data/translations.json";

// ---------- Elementos de la página ----------
const setup = document.getElementById("setup");
const quiz = document.getElementById("quiz");
const review = document.getElementById("review");
const results = document.getElementById("results");

const languageSelect = document.getElementById("language");
const mode = document.getElementById("mode");
const startLetter = document.getElementById("start-letter");
const endLetter = document.getElementById("end-letter");
const continent = document.getElementById("continent");

const letterOptions = document.getElementById("letter-options");
const continentOptions = document.getElementById("continent-options");
const selectionInfo = document.getElementById("selection-info");
const startButton = document.getElementById("start-button");
const sessionBadge = document.getElementById("session-badge");

const flag = document.getElementById("flag");
const answer = document.getElementById("answer");
const answerForm = document.getElementById("answer-form");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quitButton = document.getElementById("quit-button");
const reviewFlags = document.getElementById("review-flags");
const continueRoundButton = document.getElementById("continue-round-button");
const timerElement = document.getElementById("timer");

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

// ---------- Idioma de la interfaz ----------

function detectLanguage() {
    try {
        const saved = localStorage.getItem("flagquiz-lang");
        if (saved && translations[saved]) return saved;
    } catch {
        // localStorage no disponible: seguimos sin guardar.
    }
    return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
}

let lang = detectLanguage();

// Devuelve el texto traducido y sustituye las {variables}.
function t(key, vars = {}) {
    const text = translations[lang]?.[key] ?? translations.es[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

// Los nombres de los países se muestran según el idioma activo.
function getName(country) {
    if (lang === "en") {
        const key = normalize(country.name);
        const countryAliases = aliases[key];
        if (countryAliases && countryAliases.length > 0) {
            const formalEnglish = countryAliases.find(a => 
                a.includes("united kingdom") || 
                a.includes("united states") || 
                a.includes("republic of") ||
                a.length > 3
            ) || countryAliases[countryAliases.length - 1];
            
            return formalEnglish.replace(/\b\w/g, l => l.toUpperCase());
        }
    }
    return country.name;
}

// Rellena todos los textos fijos del HTML.
function applyTranslations() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");

    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    sessionBadge.textContent = t("badge", { n: countries.length });
}

function setLanguage(newLang) {
    lang = newLang;

    try {
        localStorage.setItem("flagquiz-lang", lang);
    } catch {
        // Ignorar.
    }

    applyTranslations();
    updateSelectionInfo();
}

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

// Además ignora puntuación: "Côte d'Ivoire" = "cote d ivoire".
function looseNormalize(text) {
    return normalize(text)
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Todos los nombres válidos de un país (español, inglés y variantes).
function getAcceptedNames(country) {
    const key = normalize(country.name);
    return [country.name, ...(aliases[key] || [])];
}

function isCorrectAnswer(input, country) {
    const given = looseNormalize(input);
    return getAcceptedNames(country).some(name => looseNormalize(name) === given);
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
        selectionInfo.textContent = t("invalidRange");
        startButton.disabled = true;
        return;
    }

    selectionInfo.textContent = t("selectionInfo", { n: selected.length });
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
    flag.alt = t("flagAlt");
    flag.onerror = () => {
        flag.alt = t("flagError");
        feedback.className = "feedback incorrect";
        feedback.textContent = t("flagError");
        feedback.classList.remove("hidden");
    };

    answer.value = "";
    answer.disabled = false;

    feedback.className = "feedback hidden";
    feedback.textContent = "";

    answerForm.classList.remove("hidden");
    nextButton.classList.add("hidden");

    document.getElementById("progress").textContent = t("progress", {
        current: roundTotal - queue.length + 1,
        total: roundTotal
    });

    document.getElementById("progress-bar").style.width =
        `${((roundTotal - queue.length) / roundTotal) * 100}%`;

    document.getElementById("score").textContent =
        t("score", { n: correctCount });

    document.getElementById("round-info").textContent =
        round === 1 ? t("roundFirst") : t("roundReview", { n: round });

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
    answerForm.classList.add("hidden"); // Oculta el formulario y el botón de comprobar respuesta

    if (isCorrect) {
        correctCount++;
        feedback.className = "feedback correct";
        feedback.textContent = t("correct");

        // Si aciertas, pasa sola a la siguiente.
        autoNextTimer = setTimeout(goToNext, 800);
    } else {
        wrongCount++;
        failed.push(currentCountry);

        feedback.className = "feedback incorrect";
        feedback.textContent = t("incorrect", { name: getName(currentCountry) });

        // Si fallas, muestra el botón de siguiente bandera.
        nextButton.classList.remove("hidden");
    }

    document.getElementById("score").textContent =
        t("score", { n: correctCount });
});

nextButton.addEventListener("click", goToNext);
continueRoundButton.addEventListener("click", continueRound);
// Permite pulsar Enter para ir a la siguiente bandera cuando estás en el botón de fallo
document.addEventListener("keydown", event => {
    if (event.key === "Enter" && !nextButton.classList.contains("hidden")) {
        event.preventDefault();
        goToNext();
    }
});

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
                    alt="${t("flagOf", { name: getName(country) })}"
                >
                <strong>${getName(country)}</strong>
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
            <div>${t("roundLine", {
                round: r.round,
                time: formatTime(r.ms),
                questions: r.questions,
                failed: r.failed
            })}</div>
        `)
        .join("");

    document.getElementById("result-message").textContent = t("resultsMessage");

    document.getElementById("result-stats").innerHTML = `
        <div>🌍 ${t("statStudied")}: <strong>${totalCountries}</strong></div>
        <div>✅ ${t("statCorrect")}: <strong>${correctCount}</strong></div>
        <div>❌ ${t("statWrong")}: <strong>${wrongCount}</strong></div>
        <div>🔁 ${t("statRounds")}: <strong>${round}</strong></div>
        <div>⏱ ${t("statTime")}: <strong>${formatTime(totalMs)}</strong></div>
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

languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
mode.addEventListener("change", updateMode);
startLetter.addEventListener("change", updateSelectionInfo);
endLetter.addEventListener("change", updateSelectionInfo);
continent.addEventListener("change", updateSelectionInfo);

startButton.addEventListener("click", startQuiz);

// ---------- Estado inicial ----------
languageSelect.value = lang;
applyTranslations();
updateMode();