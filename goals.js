document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const continueBtn = document.getElementById("continueBtn");

  if (submitBtn) submitBtn.disabled = false;
  if (continueBtn) continueBtn.style.display = "none";
});

const specific = document.getElementById("specific");
const measurable = document.getElementById("measurable");
const achievable = document.getElementById("achievable");
const relevant = document.getElementById("relevant");
const timebound = document.getElementById("timebound");
const scoreDisplay = document.getElementById("score");


function calculateSMARTScore() {
  let score = 0;

  if (specific.value.trim().length >= 10) score += 20;


  if (/\d+/.test(measurable.value) || measurable.value.includes("percent")) {
    score += 20;
  }

  if (achievable.value.trim().length >= 10) score += 20;


  if (relevant.value.trim().length >= 10) score += 20;

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

document.getElementById("goalForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.disabled = true;

  scoreDisplay.textContent = "Evaluating with AI...";

  try {
  
    const goalText = specific.value.trim();

    const aiResult = await evaluateSMARTGoal(goalText);

    const smartScore =
      aiResult.specific +
      aiResult.measurable +
      aiResult.achievable +
      aiResult.relevant +
      aiResult.timebound;

    scoreDisplay.textContent = smartScore + "%";

    localStorage.setItem("smartScore", smartScore);
    localStorage.setItem("smartFeedback", aiResult.feedback);

    localStorage.setItem("goalData", JSON.stringify({
      category: document.getElementById("category").value,
      specific: specific.value,
      measurable: measurable.value,
      achievable: achievable.value,
      relevant: relevant.value,
      timebound: timebound.value
    }));

  scoreDisplay.textContent = smartScore + "%";
const continueBtn = document.getElementById("continueBtn");
continueBtn.style.display = "inline-block";


const subtitle = document.querySelector(".subtitle");
if (subtitle) {
  subtitle.textContent = "SMART evaluation complete. Redirecting...";
}



  } catch (error) {
    console.error(error);
    scoreDisplay.textContent = "AI failed, using basic evaluation.";

 
    const fallbackScore = calculateSMARTScore();
    localStorage.setItem("smartScore", fallbackScore);

    window.location.href = "temparament.html";
  }
  
});
document.getElementById("continueBtn").addEventListener("click", () => {
  window.location.href = "temparament.html";
});

