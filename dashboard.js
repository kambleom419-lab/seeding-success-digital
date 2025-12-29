document.addEventListener("DOMContentLoaded", () => {
  const baselineScore = Number(localStorage.getItem("baselineScore")) || 0;
  const smartScore = Number(localStorage.getItem("smartScore")) || 0;

  const temperament = {
    fear: 0,
    rage: 0,
    courage: 0,
    peace: 0,
    ...JSON.parse(localStorage.getItem("temperamentData") || "{}")
  };

  const reassessments =
    JSON.parse(localStorage.getItem("reassessments")) || [];

const insightEl = document.getElementById("temperamentInsight");

if (temperament && insightEl) {
  const { fear, rage, courage, peace } = temperament;

  let insight = "";


  const traits = [
    { name: "Fear", value: fear },
    { name: "Rage", value: rage },
    { name: "Courage", value: courage },
    { name: "Peace", value: peace }
  ];

  traits.sort((a, b) => b.value - a.value);
  const dominant = traits[0];
  const weakest = traits[traits.length - 1];

  insight += `Your dominant disposition is ${dominant.name}, `;
  insight += dominant.name === "Courage"
    ? "indicating confidence and willingness to face challenges. "
    : dominant.name === "Peace"
    ? "reflecting emotional balance and calmness. "
    : dominant.name === "Fear"
    ? "suggesting hesitation and self-doubt in uncertain situations. "
    : "indicating strong emotional reactions under stress. ";

  insight += `Your weakest disposition is ${weakest.name}. `;

 
  if (fear > 60) {
    insight += "Practicing small acts of courage daily can help reduce fear. ";
  }
  if (rage > 60) {
    insight += "Mindful pauses and breathing exercises may help manage anger responses. ";
  }
  if (peace < 40) {
    insight += "Spending quiet time in reflection can help build inner peace. ";
  }
  if (courage < 40) {
    insight += "Setting and completing small challenges can strengthen courage. ";
  }

  insightEl.textContent = insight;
}

 

  document.getElementById("baselineScore").textContent =
    baselineScore + "%";

  document.getElementById("smartScore").textContent =
    smartScore + "%";

  const improvement = smartScore - baselineScore;
  document.getElementById("improvement").textContent =
    (improvement >= 0 ? "+" : "") + improvement + "%";



  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Baseline", "SMART Goal"],
      datasets: [{
        label: "Score (%)",
        data: [baselineScore, smartScore],
        backgroundColor: ["#a5d6a7", "#2e7d32"]
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
 
  const baseline = Number(localStorage.getItem("baselineScore"));
  const smart = Number(localStorage.getItem("smartScore"));

  if (!isNaN(baseline) && !isNaN(smart)) {
    const diff = smart - baseline;

    const improvementText = document.getElementById("improvementText");

    if (improvementText) {
      improvementText.textContent =
        diff >= 0
          ? `+${diff}% improvement from baseline`
          : `${diff}% change from baseline`;
    }
  }

  

  if (reassessments.length >= 2) {

    const before = reassessments[0].temperament;
    const after =
      reassessments[reassessments.length - 1].temperament;

    new Chart(document.getElementById("temperamentCompareChart"), {
      type: "radar",
      data: {
        labels: ["Fear", "Rage", "Courage", "Peace"],
        datasets: [
          {
            label: "Before",
            data: [
              before.fear,
              before.rage,
              before.courage,
              before.peace
            ],
            borderColor: "#ef5350",
            backgroundColor: "rgba(239,83,80,0.2)",
            borderWidth: 2
          },
          {
            label: "After",
            data: [
              after.fear,
              after.rage,
              after.courage,
              after.peace
            ],
            borderColor: "#2e7d32",
            backgroundColor: "rgba(46,125,50,0.2)",
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          r: { beginAtZero: true, max: 100 }
        }
      }
    });

  } else {
    document.getElementById("insightBox").textContent =
      "Complete at least two assessments to view temperament comparison.";
  }

  if (reassessments.length >= 2) {

    const labels = reassessments.map((_, i) => `Attempt ${i + 1}`);
    const smartTrend = reassessments.map(r => r.smart);
    const courageTrend = reassessments.map(r => r.temperament.courage);
    const peaceTrend = reassessments.map(r => r.temperament.peace);

    new Chart(document.getElementById("trendChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "SMART Score",
            data: smartTrend,
            borderColor: "#1976d2",
            tension: 0.3
          },
          {
            label: "Courage",
            data: courageTrend,
            borderColor: "#2e7d32",
            tension: 0.3
          },
          {
            label: "Peace",
            data: peaceTrend,
            borderColor: "#66bb6a",
            tension: 0.3
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }



  const historyList = document.getElementById("historyList");

  if (historyList) {
    if (reassessments.length === 0) {
      historyList.innerHTML = "<li>No reassessments yet.</li>";
    } else {
      reassessments.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>Attempt ${index + 1}</strong><br>
          Date: ${new Date(entry.date).toLocaleString()}<br>
          Baseline: ${entry.baseline}%<br>
          SMART: ${entry.smart}%<br>
          Courage: ${entry.temperament.courage}% |
          Peace: ${entry.temperament.peace}%
        `;
        historyList.appendChild(li);
      });
    }
  }



  const level = localStorage.getItem("userLevel") || "Observer";
  const badges =
    JSON.parse(localStorage.getItem("badges")) || [];

  const levelBox = document.getElementById("userLevel");
  if (levelBox) levelBox.textContent = level;

  const badgeBox = document.getElementById("badgesContainer");
  if (badgeBox) {
    if (badges.length === 0) {
      badgeBox.textContent = "No badges earned yet.";
    } else {
      badges.forEach(badge => {
        const span = document.createElement("span");
        span.className = "badge";
        span.textContent = badge;
        badgeBox.appendChild(span);
      });
    }
  }


  let insight = "Your journey reflects measurable personal growth. ";

  if (temperament.fear > 50)
    insight += "Fear still influences decisions. ";

  if (temperament.rage > 50)
    insight += "Emotional reactivity can be regulated further. ";

  if (temperament.courage > 50)
    insight += "Strong courage is developing. ";

  if (temperament.peace > 50)
    insight += "Inner balance is improving steadily. ";

  document.getElementById("insightBox").textContent = insight;



const resetBtn = document.getElementById("resetJourneyBtn");

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const confirmReset = confirm(
      "This will erase your entire journey and start fresh. Continue?"
    );

    if (confirmReset) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}
const aiFeedback = localStorage.getItem("smartFeedback");

if (aiFeedback) {
  document.getElementById("aiFeedback").textContent = aiFeedback;
}


});


