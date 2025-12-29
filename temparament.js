const sliders = document.querySelectorAll(".slider");
const resultBox = document.getElementById("temperamentResult");

sliders.forEach(slider => {
  const valueSpan = slider.nextElementSibling;

  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
    calculateTemperament();
  });
});

function calculateTemperament() {
  const categories = ["fear", "rage", "courage", "peace"];
  let results = {
    fear: 0,
    rage: 0,
    courage: 0,
    peace: 0
  };

  categories.forEach(cat => {
    const items = document.querySelectorAll(`.${cat}`);
    let total = 0;

    items.forEach(i => total += Number(i.value));

    const max = items.length * 5;


    results[cat] = max > 0 ? Math.round((total / max) * 100) : 0;
  });

  displayResult(results);
  localStorage.setItem("temperamentData", JSON.stringify(results));
}


function displayResult(results) {
  const dominant = Object.keys(results).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  resultBox.innerHTML = `
    <strong>Fear:</strong> ${results.fear}%<br>
    <strong>Rage:</strong> ${results.rage}%<br>
    <strong>Courage:</strong> ${results.courage}%<br>
    <strong>Peace:</strong> ${results.peace}%<br><br>
    <strong>Dominant Disposition:</strong> ${dominant.toUpperCase()}
  `;
}


document.getElementById("temperamentForm").addEventListener("submit", e => {
  e.preventDefault();

  calculateTemperament(); 
   saveReassessment();  
   calculateLevel(); 
   awardBadges();   
  window.location.href = "dashboard.html";
});

