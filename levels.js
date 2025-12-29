function calculateLevel() {
  const smart = Number(localStorage.getItem("smartScore")) || 0;
  const reassessments =
    JSON.parse(localStorage.getItem("reassessments")) || [];

  const latest =
    reassessments[reassessments.length - 1]?.temperament || {
      fear: 0,
      rage: 0,
      courage: 0,
      peace: 0
    };

  let level = "Observer";

  if (smart >= 30) level = "Aware";
  if (smart >= 50 && reassessments.length >= 2) level = "Disciplined";
  if (latest.courage + latest.peace >= 120) level = "Balanced";
  if (
    reassessments.length >= 3 &&
    latest.fear + latest.rage <= 60
  ) {
    level = "Integrated";
  }

  localStorage.setItem("userLevel", level);
  return level;
}
