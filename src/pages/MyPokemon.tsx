import Layout from "@/components/Layout"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import usePokemonStore from "@/utils/state"
import { X } from "lucide-react"
import { Link } from "react-router-dom"


const MyPokemon = () => {
  const { data, deletePokemon } = usePokemonStore()

  const handleDeletePokemon = (nickname: string) => {
    deletePokemon(nickname)
  }
  return (
    <Layout>
      <div className="container h-screen border p-[60px] bg-slate-300 dark:bg-primary-1 border-transparent rounded overflow-y-scroll">
        {data.length <= 0 && <h1 className="text-2xl text-slate-900 dark:text-white font-mono text-center">No Pokemon</h1>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
          {data?.map((pokemon, index) => (
            <Card key={index} className=" whitespace-pre-wrap bg-slate-100 dark:bg-transparent overflow-hidden ring ring-slate-200 shadow-lg dark:ring-slate-100" >
              <button className="top-3 right-3 w-full flex justify-end p-2" onClick={() => handleDeletePokemon(pokemon.nickname)}><X className="text-slate-900 dark:text-white" /></button>
              <Link to={`/pokemon/${pokemon.name}`}>
                <CardContent className="flex items-center  justify-center">
                  <img src={pokemon?.image} className="w-48 h-48" alt="image" />
                </CardContent>
              </Link>
              <CardFooter className="text-white bg-amber-500 dark:bg-primary p-4">
                <CardTitle>{pokemon?.name} {pokemon.nickname && `<${pokemon.nickname}>`}</CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default MyPokemon