import express from "express";
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is up and running" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: "book endpoint" });
});

if (ENV.NODE_ENV === "production") {
  // serve static files from frontend
  app.use(express.static(path.join(__dirname, "frontend-dist")));

  // catch-all handler for SPA (React/Vue/etc.)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend-dist", "index.html"));
  });
}


const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => 
  console.log("SERVER IS RUNNING ON PORT:", ENV.PORT));
  } catch (error) {
    console.error("error starting the server",error)
  }
};

startServer();