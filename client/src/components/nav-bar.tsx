import { useAuth } from "../context/AuthContext";
import { handleLogin } from "../utils/api/user_API";
import Skeleton from "./skeleton";
import GoogleIcon from "/google.svg.webp";
import { Button } from "@/components/ui/button";
import AccountPill from "./account-pill";

function NavBar() {
  const { user, loading, setTokens } = useAuth();

  const handleGoogleLogin = async () => {
    const result = await handleLogin();
    if (result) {
      setTokens(result.accessToken, result.idToken);
    }
  };

  return (
    <nav className="bg-white min-w-screen border-b border-border px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">💰</div>
          <h3 className="text-xl font-bold text-nowrap">Budge It.</h3>
        </div>

        {loading ? (
          <div className="flex gap-4 items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-32 h-10 rounded-md" />
          </div>
        ) : user ? (
          <div>
            <AccountPill loading={loading} />
          </div>
        ) : (
          <Button
            variant="default"
            onClick={handleGoogleLogin}
            className="flex gap-2 items-center"
          >
            <img
              src={GoogleIcon}
              width={24}
              height={24}
              className="object-contain"
              alt=""
            />
            Sign in with Google
          </Button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
