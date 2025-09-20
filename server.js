import { OpenAI } from "openai";

export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Garantir que o body é JSON e contém "pergunta"
    const body = req.body;
    if (!body || !body.pergunta) {
      return res.status(400).json({ error: "Campo 'pergunta' é obrigatório" });
    }

    // Criar cliente da OpenAI
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY não definida" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Chamada para a OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: body.pergunta }]
    });

    const respostaIA = response.choices?.[0]?.message?.content || "Sem resposta";
    return res.status(200).json({ resposta: respostaIA });

  } catch (err) {
    console.error("Erro na função predict:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
