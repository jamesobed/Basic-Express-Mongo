// ====================//
import express from "express";
import mongoose from "mongoose";

// ====================//
import routes from "./controller.js";
// ====================//
async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/upper", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    const app = express();
    app.use(express.json());
    app.use(routes);

    app.get("/", (req, res) => {
      res.send("Hello, Express and Mongoose!");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
