const specific = document.getElementById("specific");
const measurable = document.getElementById("measurable");
const achievable = document.getElementById("achievable");
const relevant = document.getElementById("relevant");
const timebound = document.getElementById("timebound");
const scoreDisplay = document.getElementById("score");

function calculateSMARTScore() {
  let score = 0;

  // Specific
  if (specific.value.trim().length >= 10) score += 20;

  // Measurable (number or metric keyword)
  if (/\d+/.test(measurable.value) || measurable.value.includes("percent")) {
    score += 20;
  }

  // Achievable
  if (achievable.value.trim().length >= 10) score += 20;

  // Relevant
  if (relevant.value.trim().length >= 10) score += 20;

  // Time-bound (date / time words)
  if (
    /\d{4}/.test(timebound.value) ||
    timebound.value.toLowerCase().includes("month") ||
    timebound.value.toLowerCase().includes("year")
  ) {
    score += 20;
  }

  scoreDisplay.textContent = score + "%";
  return score;
}

// Live scoring
[specific, measurable, achievable, relevant, timebound].forEach(field => {
  field.addEventListener("input", calculateSMARTScore);
});

// Save goal
document.getElementById("goalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const smartScore = calculateSMARTScore();

  localStorage.setItem("smartScore", smartScore);
  localStorage.setItem("goalData", JSON.stringify({
    category: document.getElementById("category").value,
    specific: specific.value,
    measurable: measurable.value,
    achievable: achievable.value,
    relevant: relevant.value,
    timebound: timebound.value
  }));

  window.location.href = "temparament.html";
});
