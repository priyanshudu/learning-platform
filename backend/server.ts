import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import "./config/redis";
import "./config/db";

import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import chapterRoutes from "./routes/chapterRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import subChapterRoutes from "./routes/subChapterRoutes";
import questionRoutes from "./routes/questionRoutes";
import progressRoutes from "./routes/progressRoutes";
const app = express();

// ==========================================
// Middleware
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Serve Frontend
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

// ==========================================
// API Routes
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/subchapters", subChapterRoutes);
 app.use(

    "/api/questions",

    questionRoutes

);
app.use(
    "/api/progress",
    progressRoutes
);
// ==========================================
// Home Route
// ==========================================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );
});

// ==========================================
// Start Server
// ==========================================

console.log("SubChapter Routes Loaded");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});