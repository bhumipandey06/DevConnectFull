import { useEffect, useState } from "react";
import ProfileCard from "../components/components1/ProfileCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/profile`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("devconnect_profile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
  }, []);

  if (!profileData) {
    return <p className="text-center text-gray-500 mt-10">No profile found.</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <header className="bg-white dark:bg-zinc-800 shadow py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">DevConnect</h1>
          <span className="text-sm text-zinc-500">Public Profile</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto py-10 px-4">
        {profileData ? (
          <>
            <ProfileCard
  name={profileData.name}
  bio={profileData.bio}
  github={profileData.github}
  linkedin={profileData.linkedin}
  portfolio={profileData.portfolio}
  techStack={profileData.techStack}
  profileImage={profileData.profileImage}
/>


            {/* Copy Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleCopy}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition-all"
              >
                Copy Profile Link
              </button>
              {copied && (
                <p className="text-green-600 text-sm mt-2">✅ Link Copied</p>
              )}
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
              <Link
                to="/"
                className="inline-block bg-zinc-700 text-white px-4 py-2 rounded shadow hover:bg-zinc-800 transition-all"
              >
                ← Back to Edit Profile
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-zinc-500">No profile data found.</p>
        )}
      </main>
    </div>
  );
};

export default Profile;
