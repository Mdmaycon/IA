import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint da sua API
app.post("/predict", async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: "Pergunta é obrigatória" });
    }

    // Chamada direta para a API da OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: pergunta }]
      })
    });

    const data = await response.json();
    const respostaIA = data.choices[0].message.content;

    res.json({ resposta: respostaIA });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de IA rodando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
