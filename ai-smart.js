const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";


async function evaluateSMARTGoal(goalText) {

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
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
Evaluate the following goal using the SMART framework.
Score each criterion from 0 to 20.

Goal:
"${goalText}"

Return ONLY valid JSON in this exact format:
{
  "specific": number,
  "measurable": number,
  "achievable": number,
  "relevant": number,
  "timebound": number,
  "feedback": "one short improvement suggestion"
}
`
        }
      ]
    })
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  const smartResult = JSON.parse(content);

  return smartResult;
}
