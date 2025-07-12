import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../components/components1/ProfileCard"; // ✅ Reuse same UI

const ProfileDetails = () => {
  const { id } = useParams(); // Get profile ID from URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/form/${id}`);
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Failed to fetch");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">❌ {error}</p>;
  }

  if (!profile) {
    return <p className="text-gray-500 text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-xl font-bold mb-6 text-center">👤 Public Profile</h2>
        <ProfileCard {...profile} />
      </div>
    </div>
  );
};

export default ProfileDetails;
