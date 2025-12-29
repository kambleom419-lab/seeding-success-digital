function awardBadges() {
  let badges = JSON.parse(localStorage.getItem("badges")) || [];

  const reassessments =
    JSON.parse(localStorage.getItem("reassessments")) || [];

  const smart = Number(localStorage.getItem("smartScore")) || 0;
  const baseline = localStorage.getItem("baselineScore");

  const latest =
    reassessments[reassessments.length - 1]?.temperament || {};

  function addBadge(name) {
    if (!badges.includes(name)) badges.push(name);
  }

  if (baseline) addBadge("First Step");
  if (smart > 0) addBadge("Goal Setter");
  if (reassessments.length >= 1) addBadge("Self-Aware");
  if (reassessments.length >= 2) addBadge("Consistent");
  if ((latest.courage || 0) + (latest.peace || 0) >= 120)
    addBadge("Balanced Mind");

  localStorage.setItem("badges", JSON.stringify(badges));
}
