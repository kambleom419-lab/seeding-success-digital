const sliders = document.querySelectorAll(".slider");

// Update value dynamically
sliders.forEach(slider => {
  const valueDisplay = slider.nextElementSibling;

  slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
  });
});

// Handle form submission
document.getElementById("baselineForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let total = 0;

  sliders.forEach(slider => {
    total += Number(slider.value);
  });

  const baselineScore = Math.round(
    (total / (sliders.length * 5)) * 100
  );

  localStorage.setItem("baselineScore", baselineScore);
  localStorage.setItem("baselineDate", new Date().toISOString());

  window.location.href = "goals.html";
});
