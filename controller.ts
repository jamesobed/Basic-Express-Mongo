import express, { Request, Response, Router } from "express";
import User, { IContactUs } from "./model"; // Import your User model

const router: Router = express.Router();

// Create a new user
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email }: { name: string; email: string } = req.body;
    const user: IContactUs = new User({ name, email });
    const savedUser: IContactUs = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users: IContactUs[] = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
