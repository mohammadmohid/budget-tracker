import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { auth } from "../utils/api/user_API";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenStorage } from "../utils/tokenStorage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  idToken: string | null;
  setTokens: (accessToken: string, idToken: string) => void;
  clearTokens: () => void;
  refreshTokensIfNeeded: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [tokensInitialized, setTokensInitialized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const setTokens = useCallback(
    (newAccessToken: string, newIdToken: string) => {
      setAccessToken(newAccessToken);
      setIdToken(newIdToken);
      // Store in localStorage with expiration
      TokenStorage.setGoogleAccessToken(newAccessToken);
      TokenStorage.setFirebaseIdToken(newIdToken);
    },
    []
  );

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setIdToken(null);
    TokenStorage.clearAllTokens();
  }, []);

  const refreshTokensIfNeeded = useCallback(async (): Promise<boolean> => {
    if (!user) return false;

    try {
      // Always try to get fresh Firebase token
      const freshIdToken = await user.getIdToken(true);

      // Check if we need to refresh Google token
      const storedGoogleToken = TokenStorage.getGoogleAccessToken();

      if (!storedGoogleToken || TokenStorage.isGoogleTokenExpiringSoon()) {
        console.warn(
          "Google access token missing or expiring soon. User needs to re-authenticate with Google."
        );
        // You might want to trigger a re-authentication flow here
        return false;
      }

      // Update tokens
      setTokens(storedGoogleToken, freshIdToken);
      return true;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      return false;
    }
  }, [user, setTokens]);

  // Initialize tokens from storage on mount
  useEffect(() => {
    const storedAccessToken = TokenStorage.getGoogleAccessToken();
    const storedIdToken = TokenStorage.getFirebaseIdToken();

    if (storedAccessToken && storedIdToken) {
      setAccessToken(storedAccessToken);
      setIdToken(storedIdToken);
    }
    setTokensInitialized(true);
  }, []);

  useEffect(() => {
    if (!tokensInitialized) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (!firebaseUser) {
        clearTokens();
        if (location.pathname !== "/") {
          navigate("/");
        }
      } else {
        try {
          const currentIdToken = await firebaseUser.getIdToken();
          setIdToken(currentIdToken);
          TokenStorage.setFirebaseIdToken(currentIdToken);

          // Restore Google token if available
          const storedAccessToken = TokenStorage.getGoogleAccessToken();
          if (storedAccessToken) {
            setAccessToken(storedAccessToken);
          } else {
            console.warn(
              "Google access token not found. User may need to re-authenticate with Google."
            );
          }
        } catch (error) {
          console.error("Error refreshing ID token:", error);
        }

        if (location.pathname === "/") {
          navigate("/dashboard");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, tokensInitialized, clearTokens]);

  // Auto-refresh tokens periodically
  useEffect(() => {
    if (!user || !accessToken) return;

    const interval = setInterval(() => {
      refreshTokensIfNeeded();
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [user, accessToken, refreshTokensIfNeeded]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        accessToken,
        idToken,
        setTokens,
        clearTokens,
        refreshTokensIfNeeded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
