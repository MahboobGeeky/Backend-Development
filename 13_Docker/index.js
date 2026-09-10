const express = require("express");

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "Hello from server..." });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
