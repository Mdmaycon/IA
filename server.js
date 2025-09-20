// server.js
import express from "express";

const app = express();

// rota simples pra teste
app.get("/", (req, res) => {
  res.send("Servidor do NPC está online ✅");
});

// Railway exige essa porta
const PORT = process.env.PORT || 5101;
app.listen(PORT, () => {
  console.log("✅ Servidor rodando na porta " + PORT);
});
