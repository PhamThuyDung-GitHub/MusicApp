// Importing necessary modules
import express from "express";
import "dotenv/config"; // Ensures environment variables are loaded at the start
import "./db"; // Database connection setup

// Router imports
import authRouter from "./routers/auth";

// Environment variable checks for debugging
console.log("MAILTRAP_USER:", process.env.MAILTRAP_USER);
console.log("MAILTRAP_PASS:", process.env.MAILTRAP_PASS);

// Creating an Express application
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registering routers
app.use("/auth", authRouter);

// Setting the server port from environment variables or default
const PORT = process.env.PORT || 8989;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Planned Features Comment (For documentation purposes, does not affect code execution)
/**
 * Planned features:
 * - Upload audio files
 * - Listen to single audio
 * - Add to favorites
 * - Create playlist
 * - Remove playlist (public-private)
 * - Remove audios
 * - Many more
 */
