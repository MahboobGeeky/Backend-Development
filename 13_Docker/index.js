const express = require("express");

const PORT = process.env.PORT ? +process.env.PORT : 8000;

const app = express();

app.get("/", (req, res) => {
  return res.json({
    status: "success",
    message: "Hello from server...",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "I am healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

