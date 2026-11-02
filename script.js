const countries = [
    ["Afganistán","af","Asia"],["Albania","al","Europa"],["Alemania","de","Europa"],
    ["Andorra","ad","Europa"],["Angola","ao","África"],["Antigua y Barbuda","ag","América del Norte"],
    ["Arabia Saudita","sa","Asia"],["Argelia","dz","África"],["Argentina","ar","América del Sur"],
    ["Armenia","am","Asia"],["Australia","au","Oceanía"],["Austria","at","Europa"],
    ["Azerbaiyán","az","Asia"],["Bahamas","bs","América del Norte"],["Baréin","bh","Asia"],
    ["Bangladesh","bd","Asia"],["Barbados","bb","América del Norte"],["Bélgica","be","Europa"],
    ["Belice","bz","América del Norte"],["Benín","bj","África"],["Bielorrusia","by","Europa"],
    ["Bolivia","bo","América del Sur"],["Bosnia y Herzegovina","ba","Europa"],["Botsuana","bw","África"],
    ["Brasil","br","América del Sur"],["Brunéi","bn","Asia"],["Bulgaria","bg","Europa"],
    ["Burkina Faso","bf","África"],["Burundi","bi","África"],["Bután","bt","Asia"],
    ["Cabo Verde","cv","África"],["Camboya","kh","Asia"],["Camerún","cm","África"],
    ["Canadá","ca","América del Norte"],["Catar","qa","Asia"],["Chad","td","África"],
    ["República Checa","cz","Europa"],["Chile","cl","América del Sur"],["China","cn","Asia"],
    ["Chipre","cy","Europa"],["Colombia","co","América del Sur"],["Comoras","km","África"],
    ["Congo","cg","África"],["Congo (Rep. Dem.)","cd","África"],["Corea del Norte","kp","Asia"],
    ["Corea del Sur","kr","Asia"],["Costa de Marfil","ci","África"],["Costa Rica","cr","América del Norte"],
    ["Croacia","hr","Europa"],["Cuba","cu","América del Norte"],["Dinamarca","dk","Europa"],
    ["Yibuti","dj","África"],["Dominica","dm","América del Norte"],["Ecuador","ec","América del Sur"],
    ["Egipto","eg","África"],["El Salvador","sv","América del Norte"],
    ["Emiratos Árabes Unidos","ae","Asia"],["Eritrea","er","África"],
    ["Eslovenia","si","Europa"],["España","es","Europa"],["Estados Unidos","us","América del Norte"],
    ["Estonia","ee","Europa"],["Etiopía","et","África"],["Filipinas","ph","Asia"],
    ["Finlandia","fi","Europa"],["Fiyi","fj","Oceanía"],["Francia","fr","Europa"],
    ["Gabón","ga","África"],["Gambia","gm","África"],["Georgia","ge","Asia"],
    ["Ghana","gh","África"],["Grecia","gr","Europa"],["Granada","gd","América del Norte"],
    ["Guatemala","gt","América del Norte"],["Guinea","gn","África"],
    ["Guinea Ecuatorial","gq","África"],["Guinea-Bisáu","gw","África"],
    ["Guyana","gy","América del Sur"],["Haití","ht","América del Norte"],
    ["Honduras","hn","América del Norte"],["Hungría","hu","Europa"],["India","in","Asia"],
    ["Indonesia","id","Asia"],["Irak","iq","Asia"],["Irán","ir","Asia"],
    ["Irlanda","ie","Europa"],["Islandia","is","Europa"],["Islas Marshall","mh","Oceanía"],
    ["Islas Salomón","sb","Oceanía"],["Israel","il","Asia"],["Italia","it","Europa"],
    ["Jamaica","jm","América del Norte"],["Japón","jp","Asia"],["Jordania","jo","Asia"],
    ["Kazajistán","kz","Asia"],["Kenia","ke","África"],["Kirguistán","kg","Asia"],
    ["Kiribati","ki","Oceanía"],["Kuwait","kw","Asia"],["Laos","la","Asia"],
    ["Lesoto","ls","África"],["Letonia","lv","Europa"],["Líbano","lb","Asia"],
    ["Liberia","lr","África"],["Libia","ly","África"],["Liechtenstein","li","Europa"],
    ["Lituania","lt","Europa"],["Luxemburgo","lu","Europa"],["Macedonia del Norte","mk","Europa"],
    ["Madagascar","mg","África"],["Malasia","my","Asia"],["Malawi","mw","África"],
    ["Maldivas","mv","Asia"],["Malí","ml","África"],["Malta","mt","Europa"],
    ["Marruecos","ma","África"],["Mauricio","mu","África"],["Mauritania","mr","África"],
    ["México","mx","América del Norte"],["Micronesia","fm","Oceanía"],["Moldavia","md","Europa"],
    ["Mónaco","mc","Europa"],["Mongolia","mn","Asia"],["Montenegro","me","Europa"],
    ["Mozambique","mz","África"],["Myanmar","mm","Asia"],["Namibia","na","África"],
    ["Nauru","nr","Oceanía"],["Nepal","np","Asia"],["Nicaragua","ni","América del Norte"],
    ["Níger","ne","África"],["Nigeria","ng","África"],["Noruega","no","Europa"],
    ["Nueva Zelanda","nz","Oceanía"],["Omán","om","Asia"],["Países Bajos","nl","Europa"],
    ["Pakistán","pk","Asia"],["Palaos","pw","Oceanía"],["Panamá","pa","América del Norte"],
    ["Papúa Nueva Guinea","pg","Oceanía"],["Paraguay","py","América del Sur"],
    ["Perú","pe","América del Sur"],["Polonia","pl","Europa"],["Portugal","pt","Europa"],
    ["Reino Unido","gb","Europa"],["República Centroafricana","cf","África"],
    ["Sudáfrica","za","África"],["República Dominicana","do","América del Norte"],
    ["Eslovaquia","sk","Europa"],["Ruanda","rw","África"],["Rumania","ro","Europa"],
    ["Rusia","ru","Europa"],["Samoa","ws","Oceanía"],["San Cristóbal y Nieves","kn","América del Norte"],
    ["San Marino","sm","Europa"],["San Vicente y las Granadinas","vc","América del Norte"],
    ["Santa Lucía","lc","América del Norte"],["Santo Tomé y Príncipe","st","África"],
    ["Senegal","sn","África"],["Serbia","rs","Europa"],["Seychelles","sc","África"],
    ["Sierra Leona","sl","África"],["Singapur","sg","Asia"],["Siria","sy","Asia"],
    ["Somalia","so","África"],["Sri Lanka","lk","Asia"],["Suazilandia","sz","África"],
    ["Sudán","sd","África"],["Sudán del Sur","ss","África"],["Suecia","se","Europa"],
    ["Suiza","ch","Europa"],["Surinam","sr","América del Sur"],["Tailandia","th","Asia"],
    ["Tanzania","tz","África"],["Tayikistán","tj","Asia"],["Timor Oriental","tl","Asia"],
    ["Togo","tg","África"],["Tonga","to","Oceanía"],["Trinidad y Tobago","tt","América del Norte"],
    ["Túnez","tn","África"],["Turkmenistán","tm","Asia"],["Turquía","tr","Asia"],
    ["Tuvalu","tv","Oceanía"],["Ucrania","ua","Europa"],["Uganda","ug","África"],
    ["Uruguay","uy","América del Sur"],["Uzbekistán","uz","Asia"],["Vanuatu","vu","Oceanía"],
    ["Venezuela","ve","América del Sur"],["Vietnam","vn","Asia"],["Yemen","ye","Asia"],
    ["Zambia","zm","África"],["Zimbabue","zw","África"]
].map(([name, code, continent]) => ({ name, code, continent }));

// ---------- Elementos de la página ----------
const setup = document.getElementById("setup");
const quiz = document.getElementById("quiz");
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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

// Nombres alternativos aceptados (claves y valores sin tildes ni mayúsculas).
const aliases = {
    "estados unidos": ["estados unidos de america", "eeuu", "ee uu", "usa", "u s a"],
    "reino unido": ["uk", "gran bretana", "great britain", "inglaterra"],
    "paises bajos": ["holanda", "netherlands"],
    "bielorrusia": ["belarus"],
    "moldavia": ["moldova", "republica de moldova"],
    "suazilandia": ["esuatini", "eswatini", "swazilandia"],
    "myanmar": ["birmania", "burma"],
    "cabo verde": ["cape verde"],
    "catar": ["qatar"],
    "barein": ["bahrein", "bahrain"],
    "yibuti": ["djibouti"],
    "costa de marfil": ["cote d ivoire", "cote divoire", "ivory coast"],
    "republica checa": ["chequia", "czechia"],
    "congo (rep. dem.)": ["republica democratica del congo", "congo democratico", "rd congo", "rdc"],
    "congo": ["republica del congo", "congo brazzaville"],
    "corea del norte": ["republica popular democratica de corea"],
    "corea del sur": ["republica de corea"],
    "macedonia del norte": ["macedonia"],
    "timor oriental": ["timor leste", "timor este"],
    "rumania": ["romania"],
    "malawi": ["malaui"],
    "iran": ["republica islamica de iran"],
    "laos": ["republica democratica popular lao"],
    "brunei": ["brunei darussalam"],
    "rusia": ["federacion de rusia"],
    "bolivia": ["estado plurinacional de bolivia"],
    "venezuela": ["republica bolivariana de venezuela"],
    "tanzania": ["republica unida de tanzania"],
    "siria": ["republica arabe siria"],
    "vietnam": ["viet nam"],
    "bahamas": ["las bahamas"],
    "santo tome y principe": ["sao tome y principe"],
    "san cristobal y nieves": ["saint kitts y nevis", "san cristobal y nevis"],
    "santa lucia": ["saint lucia"],
    "fiyi": ["fiji"],
    "sudafrica": ["republica de sudafrica"],
    "guinea-bisau": ["guinea bisau", "guinea bissau"],
    "emiratos arabes unidos": ["emiratos", "eau"],
    "botsuana": ["botswana"],
    "zimbabue": ["zimbabwe"],
    "kazajistan": ["kazajstan"],
    "kirguistan": ["kirguizistan"],
    "bosnia y herzegovina": ["bosnia"],
    "trinidad y tobago": ["trinidad"],
    "antigua y barbuda": ["antigua"],
    "papua nueva guinea": ["papua"]
};

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

    totalCountries = selected.length;
    roundTotal = queue.length;

    showScreen("quiz");
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

    flag.src = `https://flagcdn.com/${currentCountry.code}.svg`;
    flag.alt = "Bandera que debes identificar";

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
    answer.disabled = true;
    answerForm.classList.add("hidden");
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
        nextButton.focus();
    }

    document.getElementById("score").textContent =
        `${correctCount} aciertos`;
});

nextButton.addEventListener("click", goToNext);

// Termina la ronda y prepara otra con los fallos.
function finishRound() {
    if (failed.length > 0) {
        queue = shuffle(failed);
        failed = [];

        round++;
        roundTotal = queue.length;

        showQuestion();
        return;
    }

    showResults();
}

function showResults() {
    showScreen("results");

    document.getElementById("result-message").textContent =
        "¡Has conseguido acertar todas las banderas!";

    document.getElementById("result-stats").innerHTML = `
        <div>🌍 Países estudiados: <strong>${totalCountries}</strong></div>
        <div>✅ Aciertos acumulados: <strong>${correctCount}</strong></div>
        <div>❌ Fallos acumulados: <strong>${wrongCount}</strong></div>
        <div>🔁 Rondas completadas: <strong>${round}</strong></div>
    `;
}

function backToSetup() {
    clearTimeout(autoNextTimer);
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