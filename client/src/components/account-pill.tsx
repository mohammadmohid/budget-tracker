import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { handleLogout } from "@/utils/api/user_API";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

interface AccountPillProps {
  loading: boolean;
}

export default function AccountPill({ loading }: AccountPillProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logoutAndRedirect = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {loading ? (
          <div className="flex gap-2 items-center">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-20 h-4 rounded-md hidden md:block" />
          </div>
        ) : (
          <div className="flex gap-2 items-center bg-white hover:bg-border px-4 py-2 rounded-full cursor-pointer">
            <Avatar className="w-8 h-8 ring ring-border">
              <AvatarImage src={user.photoURL} alt="Profile" />
              <AvatarFallback>
                {user.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:block">
              Hi, {user.displayName}
            </span>
            <ChevronDown />
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-48">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">Signed in as</span>
          <span className="font-medium text-sm truncate">{user.email}</span>

          <hr className="my-2" />

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/profile")}
          >
            Profile Settings
          </Button>
          <Button
            size="sm"
            onClick={logoutAndRedirect}
            className="bg-[#fee2e2] text-[#ef4444] border-[#ef4444] hover:text-white hover:bg-coral"
          >
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
