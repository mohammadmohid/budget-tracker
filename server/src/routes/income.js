import express from "express";
import {
  saveDataToDrive,
  readDataFromDrive,
} from "../services/googleDriveService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await readDataFromDrive(req.googleAccessToken, "income.json");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load income data." });
  }
});

router.post("/", async (req, res) => {
  try {
    const incomeData = await readDataFromDrive(
      req.googleAccessToken,
      "income.json"
    );
    const newIncome = {
      amount: req.body.amount,
      source: req.body.source,
      description: req.body.description,
      date: req.body.date,
      incomeType: req.body.incomeType,
    };
    const updatedData = [...incomeData, newIncome];

    await saveDataToDrive(req.googleAccessToken, "income.json", updatedData);
    res.status(201).json(newIncome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save income data." });
  }
});

export default router;
