interface TokenData {
  value: string;
  expiry: number;
  timestamp: number;
}

export class TokenStorage {
  private static GOOGLE_TOKEN_KEY = "googleAccessToken";
  private static FIREBASE_TOKEN_KEY = "firebaseIdToken";

  // Google tokens typically expire in 1 hour
  private static GOOGLE_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour
  private static FIREBASE_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

  static setGoogleAccessToken(token: string): void {
    const tokenData: TokenData = {
      value: token,
      expiry: Date.now() + this.GOOGLE_TOKEN_EXPIRY,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.GOOGLE_TOKEN_KEY, JSON.stringify(tokenData));
  }

  static getGoogleAccessToken(): string | null {
    const stored = localStorage.getItem(this.GOOGLE_TOKEN_KEY);
    if (!stored) return null;

    try {
      const tokenData: TokenData = JSON.parse(stored);

      // Check if token is expired
      if (Date.now() > tokenData.expiry) {
        localStorage.removeItem(this.GOOGLE_TOKEN_KEY);
        return null;
      }

      return tokenData.value;
    } catch (err) {
      console.error("Error while fetching access token: ", err);
      localStorage.removeItem(this.GOOGLE_TOKEN_KEY);
      return null;
    }
  }

  static setFirebaseIdToken(token: string): void {
    const tokenData: TokenData = {
      value: token,
      expiry: Date.now() + this.FIREBASE_TOKEN_EXPIRY,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.FIREBASE_TOKEN_KEY, JSON.stringify(tokenData));
  }

  static getFirebaseIdToken(): string | null {
    const stored = localStorage.getItem(this.FIREBASE_TOKEN_KEY);
    if (!stored) return null;

    try {
      const tokenData: TokenData = JSON.parse(stored);

      if (Date.now() > tokenData.expiry) {
        localStorage.removeItem(this.FIREBASE_TOKEN_KEY);
        return null;
      }

      return tokenData.value;
    } catch (err) {
      console.error("Error while fetching id token: ", err);
      localStorage.removeItem(this.FIREBASE_TOKEN_KEY);
      return null;
    }
  }

  static clearAllTokens(): void {
    localStorage.removeItem(this.GOOGLE_TOKEN_KEY);
    localStorage.removeItem(this.FIREBASE_TOKEN_KEY);
  }

  static isGoogleTokenExpiringSoon(): boolean {
    const stored = localStorage.getItem(this.GOOGLE_TOKEN_KEY);
    if (!stored) return true;

    try {
      const tokenData: TokenData = JSON.parse(stored);
      const timeToExpiry = tokenData.expiry - Date.now();
      return timeToExpiry < 5 * 60 * 1000; // Less than 5 minutes left
    } catch {
      return true;
    }
  }
}
