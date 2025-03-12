import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Get the absolute directory path
const __dirname = path.resolve();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html by default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Static site running at http://localhost:${PORT}`);
});
