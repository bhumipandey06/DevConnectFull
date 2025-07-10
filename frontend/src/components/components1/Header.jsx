// src/components/Header.jsx
import { Sun, Moon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-xl font-bold text-zinc-800 dark:text-white">DevConnect</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
