import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import videoRoutes from "./routes/videoRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Learning Portal API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});