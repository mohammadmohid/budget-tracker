// src/utils/api/transaction_API.ts
import axios from "./axios";

export const saveTransaction = async (
  accessToken: string,
  idToken: string,
  transaction: any
): Promise<{ message: string; fileId?: string } | null> => {
  try {
    const response = await axios.post(
      "/save-transaction",
      { googleAccessToken: accessToken, transaction },
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving transaction:", error);
    return null;
  }
};
