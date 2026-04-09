const slider = document.getElementById("spending");
const val = document.getElementById("spendingVal");

slider.oninput = () => val.innerText = slider.value;

function run() {

    let s = parseInt(slider.value);
    let m = document.getElementById("maturity").value;
    let i = document.getElementById("inflation").value;
    let cb = document.getElementById("cb").value;
    let safe = document.getElementById("safe").value;
    let fiscal = document.getElementById("fiscal").value;

    // BASE SCORE
    let score = s / 2;

    // INFLATION
    if (i === "high") score += 25;
    if (i === "moderate") score += 10;

    // CENTRAL BANK
    if (cb === "hawkish") score += 15;
    if (cb === "dovish") score -= 10;

    // SAFE HAVEN
    if (safe === "high") score -= 15;
    if (safe === "low") score += 10;

    // FISCAL
    if (fiscal === "weak") score += 20;

    score = Math.max(0, Math.min(score, 100));

    // OUTPUTS

    let yield = score > 70 ? "Strong ↑" :
                score > 40 ? "Moderate ↑" : "Neutral";

    let curve = m === "long" && score > 40 ? "Steepening" :
                m === "short" ? "Flattening" : "Neutral";

    let supply = score > 70 ? "High" :
                 score > 40 ? "Moderate" : "Low";

    let term = score > 60 ? "Rising" : "Stable";

    let vol = score > 70 ? "High" :
              score > 40 ? "Moderate" : "Low";

    let dur = score > 60 ? "High Risk" :
              score > 30 ? "Moderate" : "Low";

    // RENDER

    document.getElementById("scoreBar").style.width = score + "%";
    document.getElementById("scoreVal").innerText = Math.round(score);

    document.getElementById("yield").innerText = yield;
    document.getElementById("curve").innerText = curve;
    document.getElementById("supply").innerText = supply;
    document.getElementById("term").innerText = term;
    document.getElementById("vol").innerText = vol;
    document.getElementById("dur").innerText = dur;

    // ANALYSIS

    document.getElementById("analysis").innerHTML = `
    A defense expansion of $${s}bn increases issuance pressure.

    Combined with ${i} inflation and ${cb} policy stance,
    total bond stress is ${Math.round(score)}.

    Safe-haven demand (${safe}) and fiscal credibility (${fiscal})
    further shape yield behavior and volatility.

    This scenario suggests ${yield} yield pressure
    with a ${curve} curve dynamic.
    `;
}
