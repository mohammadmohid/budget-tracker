interface TokenData {
  value: string;
  expiry: number;
}

export class TokenStorage {
  private static GOOGLE_TOKEN_KEY = "googleAccessToken";
  private static FIREBASE_TOKEN_KEY = "firebaseIdToken";

  static setToken(key: string, value: string, expiryMs: number): void {
    const tokenData: TokenData = {
      value,
      expiry: Date.now() + expiryMs,
    };
    localStorage.setItem(key, JSON.stringify(tokenData));
  }

  static getToken(key: string): string | null {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    try {
      const { value, expiry }: TokenData = JSON.parse(stored);

      // Check if token is expired
      if (Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
      localStorage.removeItem(key);
      return null;
    }
  }

  static clearAllTokens(): void {
    localStorage.removeItem(this.GOOGLE_TOKEN_KEY);
    localStorage.removeItem(this.FIREBASE_TOKEN_KEY);
  }

  static isTokenExpiringSoon(
    key: string,
    thresholdMs = 5 * 60 * 1000
  ): boolean {
    const stored = localStorage.getItem(key);
    if (!stored) return true;

    try {
      const { expiry }: TokenData = JSON.parse(stored);
      return expiry - Date.now() < thresholdMs;
    } catch {
      return true;
    }
  }

  static setGoogleAccessToken(token: string): void {
    this.setToken(this.GOOGLE_TOKEN_KEY, token, 60 * 60 * 1000);
  }
  static getGoogleAccessToken(): string | null {
    return this.getToken(this.GOOGLE_TOKEN_KEY);
  }
  static isGoogleTokenExpiringSoon(): boolean {
    return this.isTokenExpiringSoon(this.GOOGLE_TOKEN_KEY);
  }

  static setFirebaseIdToken(token: string): void {
    this.setToken(this.FIREBASE_TOKEN_KEY, token, 60 * 60 * 1000);
  }
  static getFirebaseIdToken(): string | null {
    return this.getToken(this.FIREBASE_TOKEN_KEY);
  }
}
