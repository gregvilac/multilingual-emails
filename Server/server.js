const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const sendTestEmail = require("./utils/emailHandlers");

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = http.createServer(app);

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
};
app.use(
  cors(corsOptions),
  express.json(),
  express.urlencoded({ extended: true }),
  express.static("public")
);

app.post("/email", async (req, res) => {
  const sent = await sendTestEmail(req.body.email, req.body.lang);
  if (sent !== 202) {
    res.status(500).json("Email failed");
  } else {
    res.status(200).json("Email sent");
  }
});

httpServer.listen(PORT, () => {
  console.log("server running");
});
