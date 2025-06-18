import express from "express";
import {
  saveDataToDrive,
  readDataFromDrive,
} from "../services/googleDriveService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await readDataFromDrive(
      req.googleAccessToken,
      "expenses.json"
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load expense data." });
  }
});

router.post("/", async (req, res) => {
  try {
    const expenseData = await readDataFromDrive(
      req.googleAccessToken,
      "expenses.json"
    );

    const newExpense = {
      id: Date.now().toString(),
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      paymentMethod: req.body.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const updatedData = [...expenseData, newExpense];
    await saveDataToDrive(req.googleAccessToken, "expenses.json", updatedData);

    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save expense data." });
  }
});

export default router;
