import admin from "../config/firebaseAdmin.js";

export async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token found." });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };
    req.googleAccessToken =
      req.headers["x-google-access-token"] ||
      (req.body?.googleAccessToken ?? null); // Fallback if body exists (NOT FOR GET)
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
}
