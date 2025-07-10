import React, { useEffect, useState } from "react";
import Form from "../components/components1/Form";
import ProfileCard from "../components/components1/ProfileCard";
import { getAllProfiles } from "../utils/profileStorage";

const Home = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const STORAGE_KEY = "devconnect_profile";

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setName(parsed.name || "");
      setBio(parsed.bio || "");
      setTechStack(parsed.techStack || []);
      setGithub(parsed.github || "");
      setLinkedin(parsed.linkedin || "");
      setPortfolio(parsed.portfolio || "");
      setProfileImage(parsed.profileImage || null);
    }
  }, []);

  useEffect(() => {
    const data = {
      name,
      bio,
      techStack,
      github,
      linkedin,
      portfolio,
      profileImage,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [name, bio, techStack, github, linkedin, portfolio, profileImage]);

  useEffect(() => {
    const profiles = getAllProfiles();
    setSavedProfiles(profiles);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">
          Your Info
        </h2>
        <Form
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          techStack={techStack}
          setTechStack={setTechStack}
          github={github}
          setGithub={setGithub}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          savedProfiles={savedProfiles}
          setSavedProfiles={setSavedProfiles}
          selectedProfileId={selectedProfileId}
          setSelectedProfileId={setSelectedProfileId}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">
          Live Preview
        </h2>
        <ProfileCard
          name={name}
          bio={bio}
          techStack={techStack}
          github={github}
          linkedin={linkedin}
          portfolio={portfolio}
          profileImage={profileImage}
        />
      </div>
    </div>
  );
};

export default Home;
