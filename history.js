function saveReassessment() {
  const baseline = Number(localStorage.getItem("baselineScore"));
  const smart = Number(localStorage.getItem("smartScore"));
  const temperament = JSON.parse(localStorage.getItem("temperamentData"));

  if (!baseline || !smart || !temperament) return;

  const reassessment = {
    date: new Date().toISOString(),
    baseline,
    smart,
    temperament
  };

  const history =
    JSON.parse(localStorage.getItem("reassessments")) || [];

  history.push(reassessment);

  localStorage.setItem("reassessments", JSON.stringify(history));
}
