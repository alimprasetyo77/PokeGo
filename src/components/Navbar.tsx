import useTheme from "@/utils/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="container bg-slate-100 dark:bg-primary-1 flex items-center justify-center md:justify-between px-16 py-4">
        <Link to={"/"}>
          <div className="flex items-center p-2  gap-4">
            <img
              src="https://pokemon-iota-jet.vercel.app/_next/image?url=%2FPokeBall.ico&w=64&q=75"
              className="h-14 "
              alt="pokemon"
            />
            <span className="text-slate-900 dark:text-white font-semibold text-xl ">PokeGo</span>
          </div>
        </Link>

        <ul className="items-center  gap-x-8 text-[#666] font-semibold flex flex-grow md:flex-grow-0 justify-end">
          <Link className="hidden md:block" to={"/"}>
            <li
              className={`hover:text-secondary cursor-pointer duration-200 ${
                pathname === "/" && "text-secondary"
              }`}
            >
              Home
            </li>
          </Link>
          <Link className="hidden md:block" to={"/my-pokemon"}>
            <li
              className={`hover:text-secondary cursor-pointer duration-200 ${
                pathname === "/my-pokemon" && "text-secondary"
              }`}
            >
              My Pokemon
            </li>
          </Link>
          <li className="ml-8">
            <button onClick={() => toggleTheme()}>
              {theme === "dark" ? (
                <Sun className="text-slate-900 dark:text-white w-8 h-8" />
              ) : (
                <Moon className="text-slate-900 dark:text-white w-8 h-8" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
