// Importar bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // se não tiver, instale com npm install node-fetch

const app = express();
app.use(bodyParser.json());

// Pega a API Key da variável de ambiente
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Endpoint principal
app.post("/", async (req, res) => {
    const prompt = req.body.message;
    if (!prompt) return res.status(400).json({ error: "Mensagem vazia" });

    try {
        // Chamada para OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-5-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao chamar OpenAI" });
    }
});

// Porta do Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
