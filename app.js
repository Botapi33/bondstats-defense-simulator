function runSimulation() {

    let spending = parseInt(document.getElementById("spending").value);
    let maturity = document.getElementById("maturity").value;
    let inflation = document.getElementById("inflation").value;

    let pressureScore = calculatePressureScore(spending);
    let inflationScore = inflation === "high" ? 30 : inflation === "moderate" ? 15 : 5;

    let totalScore = pressureScore + inflationScore;

    let yield = getYield(totalScore);
    let curve = getCurve(maturity, totalScore);
    let pressure = getPressureLabel(pressureScore);

    renderBars(totalScore);
    renderResults(yield, curve, pressure, totalScore);
}

// SCORE SYSTEM

function calculatePressureScore(spending) {
    return Math.min(spending / 2, 70);
}

function getPressureLabel(score) {
    if (score > 50) return "High";
    if (score > 25) return "Moderate";
    return "Low";
}

// YIELD

function getYield(score) {
    if (score > 60) return "Strong Upward Pressure ↑";
    if (score > 30) return "Moderate Upward Pressure ↑";
    return "Neutral";
}

// CURVE

function getCurve(maturity, score) {
    if (maturity === "long" && score > 30) return "Steepening";
    if (maturity === "short" && score < 20) return "Flattening";
    return "Neutral";
}

// VISUALS

function renderBars(score) {
    document.getElementById("scoreBar").style.width = score + "%";
    document.getElementById("scoreValue").innerText = Math.round(score);
}

// OUTPUT

function renderResults(yield, curve, pressure, score) {
    document.getElementById("results").innerHTML = `
        <div class="metric"><b>Yield Direction:</b> ${yield}</div>
        <div class="metric"><b>Curve Impact:</b> ${curve}</div>
        <div class="metric"><b>Supply Pressure:</b> ${pressure}</div>
        <div class="metric"><b>Bond Stress Score:</b> ${Math.round(score)}/100</div>
    `;
}
