import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/api/axios";

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  // Add any additional fields stored in your database
}

function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          setError("User not authenticated");
          return;
        }

        const token = await user.getIdToken();

        const res = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setProfile(res.data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(
          err.response?.data?.error || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchProfile();
  }, [user, authLoading]);

  if (authLoading || loading)
    return <div className="p-8 animate-pulse">Loading profile...</div>;

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="space-y-2 bg-gray-100 rounded-xl p-4">
        <p>
          <strong>Name:</strong> {profile?.name || user?.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email || user?.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(
            profile?.createdAt || user?.metadata?.creationTime || ""
          ).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default Profile;
