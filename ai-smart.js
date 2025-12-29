async function evaluateSMARTGoal(goalText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a goal-setting expert and youth mentor."
        },
        {
          role: "user",
          content: `
Evaluate the following goal using SMART criteria.
Score each criterion from 0 to 20.

Goal:
"${goalText}"

Return ONLY valid JSON in this format:
{
  "specific": number,
  "measurable": number,
  "achievable": number,
  "relevant": number,
  "timebound": number,
  "feedback": "one short suggestion"
}
`
        }
      ]
    })
  });
}
