const spendingSlider = document.getElementById("spending");
const spendingValue = document.getElementById("spendingValue");

spendingSlider.oninput = () => {
    spendingValue.innerText = spendingSlider.value;
};

function runSimulation() {

    let spending = parseInt(spendingSlider.value);
    let maturity = document.getElementById("maturity").value;
    let inflation = document.getElementById("inflation").value;

    let pressure = getSupplyPressure(spending);
    let yieldMove = getYieldDirection(pressure, inflation);
    let curve = getCurveImpact(maturity, pressure, inflation);
    let analysis = generateAnalysis(spending, maturity, inflation, pressure);

    document.getElementById("yieldBox").innerHTML =
        `<strong>Yield Direction:</strong> ${yieldMove}`;

    document.getElementById("curveBox").innerHTML =
        `<strong>Curve Impact:</strong> ${curve}`;

    document.getElementById("pressureBox").innerHTML =
        `<strong>Supply Pressure:</strong> ${pressure}`;

    document.getElementById("analysisBox").innerHTML = analysis;
}

// LOGIC MODULES

function getSupplyPressure(spending) {
    if (spending > 200) return "High";
    if (spending > 80) return "Moderate";
    return "Low";
}

function getYieldDirection(pressure, inflation) {

    if (pressure === "High" && inflation === "high") {
        return "Strong Upward Pressure ↑";
    }

    if (pressure !== "Low") {
        return "Moderate Upward Pressure ↑";
    }

    return "Neutral";
}

function getCurveImpact(maturity, pressure, inflation) {

    if (maturity === "long" && pressure !== "Low") {
        return "Steepening";
    }

    if (inflation === "low" && maturity === "short") {
        return "Flattening";
    }

    return "Neutral";
}

function generateAnalysis(spending, maturity, inflation, pressure) {

    return `
    <strong>Market Interpretation</strong><br><br>

    A defense spending increase of $${spending}bn implies higher government borrowing needs,
    leading to increased bond issuance.

    <br><br>

    Supply pressure is assessed as <strong>${pressure}</strong>, which directly impacts yield formation.

    <br><br>

    ${maturity === "long" ? "A long-term issuance strategy concentrates pressure on the long end of the curve." : ""}

    ${inflation === "high" ? "Elevated inflation expectations reinforce upward yield pressure and increase term premium sensitivity." : ""}

    <br><br>

    This simulation reflects structural dynamics rather than precise market forecasts.
    `;
}
