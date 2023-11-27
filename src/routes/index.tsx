import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "../pages"
import DetailPokemon from "@/pages/DetailPokemon"
import Battle from "@/pages/Battle"
import MyPokemon from "@/pages/MyPokemon"
const router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/pokemon/:name",
      element: <DetailPokemon />
    },
    {
      path: "/battle/:name",
      element: <Battle />
    },
    {
      path: "/my-pokemon",
      element: <MyPokemon />
    }

  ])
  return <RouterProvider router={router} />
}

export default router