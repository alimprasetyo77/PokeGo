import { useState, useEffect } from "react";

type Theme = "light" | "dark";

function useTheme() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<Theme>(savedTheme as Theme);

  useEffect(() => {
    // Menyimpan nilai ke localStorage setiap kali nilai berubah
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newValue = theme === "dark" ? "light" : "dark";
    setTheme(newValue);
  };

  return { toggleTheme, theme };
}

export default useTheme;
