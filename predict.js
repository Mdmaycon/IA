import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: "Pergunta é obrigatória" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: pergunta }]
    });

    const respostaIA = response.choices[0].message.content;

    res.status(200).json({ resposta: respostaIA });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
