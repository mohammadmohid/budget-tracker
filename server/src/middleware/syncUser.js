import { createOrUpdateUser } from "../services/userService.js";

export async function syncFirebaseUser(req, res, next) {
  try {
    await createOrUpdateUser(req.user);
    next();
  } catch (err) {
    console.error("Failed to sync user:", err);
    res.status(500).json({ message: "Internal error syncing user" });
  }
}
