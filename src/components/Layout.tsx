/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react"
import Navbar from "./Navbar"
import { useLocation, useParams } from "react-router-dom"
import NavbarMobile from "./NavbarMobile"

interface props {
  children: ReactNode
}
const Layout = ({ children }: Readonly<props>) => {
  const { name } = useParams();

  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === "/") {
      document.title = "Pokemon - App"
    } else if (pathname === `/pokemon/${name}`) {
      document.title = `Pokemon - ${name}`
    } else if (pathname === `/battle/${name}`) {
      document.title = `Battle - ${name}`
    } else {
      document.title = "My - Pokemon"
    }
  }, [pathname, name]);
  return (
    <div className="min-h-screen bg-slate-400 dark:bg-primary flex flex-col items-center ">
      <Navbar />
      {children}
      <NavbarMobile />
    </div>
  )
}

export default Layout