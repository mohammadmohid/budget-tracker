import { Router } from "express";
import { verifyFirebaseToken } from "../middleware/auth.js";
import {
  saveDataToDrive,
  readDataFromDrive,
} from "../services/googleDriveService.js";

const router = Router();

router.get("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const userData = await readDataFromDrive(
      req.googleAccessToken,
      "user-profile.json"
    );

    // If no profile exists, create default one
    if (!userData || userData.length === 0) {
      const defaultProfile = {
        uid: req.user.uid,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        budgetRule: "50-30-20",
        budgetGoals: {
          monthly: 0,
          categories: {},
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveDataToDrive(
        req.googleAccessToken,
        "user-profile.json",
        defaultProfile
      );

      return res.json(defaultProfile);
    }

    res.json(userData);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Failed to load user profile." });
  }
});

router.put("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const existingProfile = await readDataFromDrive(
      req.googleAccessToken,
      "user-profile.json"
    );

    const updatedProfile = {
      ...existingProfile,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    await saveDataToDrive(
      req.googleAccessToken,
      "user-profile.json",
      updatedProfile
    );

    res.json(updatedProfile);
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: "Failed to update user profile." });
  }
});

router.post("/budget-rule", verifyFirebaseToken, async (req, res) => {
  try {
    const { budgetRule } = req.body;

    if (!["50-30-20", "70-20-10"].includes(budgetRule)) {
      return res.status(400).json({
        message: "Invalid budget rule. Must be '50-30-20' or '70-20-10'",
      });
    }

    const existingProfile = await readDataFromDrive(
      req.googleAccessToken,
      "user-profile.json"
    );

    const updatedProfile = {
      ...existingProfile,
      budgetRule,
      updatedAt: new Date().toISOString(),
    };

    await saveDataToDrive(
      req.googleAccessToken,
      "user-profile.json",
      updatedProfile
    );

    res.json({ message: "Budget rule updated", budgetRule });
  } catch (err) {
    console.error("Error updating budget rule:", err);
    res.status(500).json({ message: "Failed to update budget rule." });
  }
});

router.post("/budget-goals", verifyFirebaseToken, async (req, res) => {
  try {
    const { monthly, categories } = req.body;

    const existingProfile = await readDataFromDrive(
      req.googleAccessToken,
      "user-profile.json"
    );

    const updatedProfile = {
      ...existingProfile,
      budgetGoals: {
        monthly,
        categories,
      },
      updatedAt: new Date().toISOString(),
    };

    await saveDataToDrive(
      req.googleAccessToken,
      "user-profile.json",
      updatedProfile
    );

    res.json({ message: "Budget goals updated" });
  } catch (err) {
    console.error("Error updating budget goals:", err);
    res.status(500).json({ message: "Failed to update budget goals." });
  }
});

export default router;
