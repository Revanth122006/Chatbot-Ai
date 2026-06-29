const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

res.send(

"Robust AI Backend Running"

);

});

app.post(

"/api/chat",

async (req, res) => {

try {

const {

message

} = req.body;

if (!message) {

return res.status(400).json({

reply:

"No message received"

});

}

const response = await axios.post(

"http://localhost:11434/api/generate",

{

model: "llama3",

prompt: message,

stream: false,

options: {

temperature: 0.7,

num_predict: 150

}

},

{

timeout: 60000

}

);

const reply =

response.data.response

||

"Empty response";

res.json({

reply

});

}

catch (err) {

console.log(

err.message

);

res.status(500).json({

reply:

"Ollama connection failed"

});

}

}

);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
