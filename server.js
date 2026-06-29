const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
  res.send("Robust AI Backend Running");
});

app.post("/api/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile"
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});