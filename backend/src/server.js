import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

// ESM-safe __dirname: this will be /opt/render/project/src/backend/src on Render
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is up and running" });
});

// Example API
app.get("/books", (req, res) => {
  res.status(200).json({ message: "book endpoint" });
});

if (ENV.NODE_ENV === "production") {
  // Build files are copied to backend/frontend-dist in the Render build step:
  // cp -r dist ../backend/frontend-dist
  //
  // __dirname = /backend/src
  // ../frontend-dist = /backend/frontend-dist
  const distPath = path.join(__dirname, "../frontend-dist");

  // Serve static assets
  app.use(express.static(distPath));

  // SPA catch-all (for React/Vite router)
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("SERVER IS RUNNING ON PORT:", ENV.PORT);
    });
  } catch (error) {
    console.error("error starting the server", error);
  }
};

startServer();




























































































// import express from "express";
// import path from "path";

// import { ENV } from "./lib/env.js";
// import { connectDB } from "./lib/db.js";

// const app = express();

// const __dirname = path.resolve();

// app.get("/health", (req, res) => {
//   res.status(200).json({ message: "api is up and running" });
// });

// app.get("/books", (req, res) => {
//   res.status(200).json({ message: "book endpoint" });
// });

// if (ENV.NODE_ENV === "production") {
//   // serve static files from frontend
//   app.use(express.static(path.join(__dirname, "frontend-dist")));

//   // catch-all handler for SPA (React/Vue/etc.)
//   app.use((req, res) => {
//     res.sendFile(path.join(__dirname, "frontend-dist", "index.html"));
//   });
// }


// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(ENV.PORT, () => 
//   console.log("SERVER IS RUNNING ON PORT:", ENV.PORT));
//   } catch (error) {
//     console.error("error starting the server",error)
//   }
// };

startServer();