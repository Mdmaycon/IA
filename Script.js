
import express from "express";
import fetch from "node-fetch"; // precisa estar no package.json
const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/npc", async (req, res) => {
  const pergunta = req.body.pergunta || "Olá";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um NPC sábio em um jogo de Roblox. Responda de forma curta e amigável." },
          { role: "user", content: pergunta }
        ]
      })
    });

    const data = await response.json();
    const resposta = data.choices[0].message.content;

    res.json({ resposta });
  } catch (err) {
    console.error(err);
    res.json({ resposta: "Erro ao falar com a IA." });
  }
});

app.listen(3000, () => console.log("Servidor de IA rodando na porta 3000"));
