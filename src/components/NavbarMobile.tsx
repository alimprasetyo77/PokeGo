import { Home } from "lucide-react"
import { Link } from "react-router-dom"

const NavbarMobile = () => {
  return (
    <div className="md:hidden fixed z-10 bottom-0 inset-x-0 h-16 p-1 bg-white dark:bg-slate-700 dark:text-white flex items-center">
      <Link to={'/'} className="grow flex flex-col items-center font-semibold">
        <button className="flex flex-col items-center"><Home /> Home</button>
      </Link>
      <Link to={"/my-pokemon"} className="grow flex flex-col items-center font-semibold">
        <button className="flex flex-col items-center">
          <img src="https://pokemon-iota-jet.vercel.app/_next/image?url=%2FPokeBall.ico&w=64&q=75" className="grayscale	w-8" alt="pokemon" />
          Pokemon
        </button>
      </Link>
    </div>
  )
}

export default NavbarMobile