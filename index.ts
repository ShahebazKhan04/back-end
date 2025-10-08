import express from "express";
import type { Request, Response } from "express"; // only types
import connectDb from "./db/connectDb.ts";
import userModel from "./models/tbUserModel.ts";
import cors from "cors";

const app = express();
const port = 5000;

connectDb();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);  

app.post("/users/add", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = await userModel.create(name);
    res.status(201).json({
      success: true,
      message: "User created",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error while creating user",
      error: error.message,
    });
  }
});


app.get("/users/get", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.put("/users/update/:id", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
});


app.delete("/users/delete/:id", async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server started at port number ${port}`);
});
