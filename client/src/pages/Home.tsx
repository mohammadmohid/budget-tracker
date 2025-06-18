import GoogleIcon from "/google.svg.webp";
import { handleLogin } from "../utils/api/user_API";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Home() {
  const { setTokens } = useAuth();

  const handleGoogleLogin = async () => {
    const result = await handleLogin();
    if (result) {
      setTokens(result.accessToken, result.idToken);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[75vh]">
        <h1 className="text-3xl font-semibold mb-4">
          💸 Welcome, please login to get started.
        </h1>
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
      </div>
    </div>
  );
}

export default Home;
