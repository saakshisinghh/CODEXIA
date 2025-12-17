import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import {serve} from "inngest/express";
import {clerkMiddleware} from '@clerk/express';



import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import {  inngest,functions} from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
const app = express();

// ESM-safe __dirname. On Render this becomes: /opt/render/project/src/backend/src
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json())
// CREDENTITALS TRUE MEAN SERVER ALLOWS A BROWSER TO INCLUDE COOKIES ON REQUEST
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware());

// routes
app.use("/api/inngest", serve ({client:inngest , functions}))
app.use("/api/chat",chatRoutes)
app.use("/api/sessions", sessionRoutes);

// example 
app.get("/health", (req, res) => {
 res.status(200).json({ message: "api is up and running" });
});


if (ENV.NODE_ENV === "production") {
  // Build command copies dist here: ../backend/frontend-dist
  // From /backend/src → ../frontend-dist = /backend/frontend-dist
  const distPath = path.join(__dirname, "../frontend-dist");

  // Serve static assets
  app.use(express.static(distPath));

  // SPA fallback
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