const express = require("express");
const path = require("path");
const app = express();

// Serve the static files from the React app's build folder
app.use(express.static(path.join(__dirname, "build")));

// API route proxy
app.use("/api", (req, res) => {
  // Replace with your actual API handler or proxy logic
  res.send({ message: "API is working!" });
});

// For any other route, serve index.html from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
