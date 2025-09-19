import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

// Configura a API da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor de IA rodando 🚀");
});

// Rota que chama a IA
app.post("/perguntar", async (req, res) => {
  try {
    const pergunta = req.body.pergunta;

    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pergunta }]
    });

    res.json({ resposta: resposta.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao chamar a API da OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
