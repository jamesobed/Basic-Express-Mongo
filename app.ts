import express from "express";
import mongoose, { Connection } from "mongoose";
import { Application, Request, Response } from "express";

import routes from "./controller";

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/upper");

    const db: Connection = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    const app: Application = express();
    app.use(express.json());
    app.use(routes);

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, Express and Mongoose!");
    });

    const PORT: number = parseInt(process.env.PORT || "3001", 10);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
