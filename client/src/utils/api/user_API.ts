import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
} from "firebase/auth";
import app from "./firebase";
import axios from "./axios";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.file");

interface LoginResult {
  user: User;
  accessToken: string; // Google
  idToken: string; // Firebase
}

export const handleLogin = async (): Promise<LoginResult | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("Failed to retrieve credentials from Google Sign-In");
    }
    const accessToken = credential.accessToken;
    const idToken = await result.user.getIdToken();
    const user = result.user;

    return { user, accessToken, idToken };
  } catch (err) {
    console.error("Login Error:", err);
    return null;
  }
};

export const handleLogout = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    console.error("Logout Error: ", err);
    return false;
  }
};

export const saveBudgetData = async (
  accessToken: string,
  idToken: string,
  budgetData: unknown
): Promise<{ message: string; fileId?: string } | null> => {
  try {
    const response = await axios.post(
      "/save-budget",
      { googleAccessToken: accessToken, budgetData },
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving budget:", error);
    return null;
  }
};
