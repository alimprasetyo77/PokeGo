import Layout from "@/components/Layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPokemonImage, getPokemons } from "@/utils/apis/pokemons/api"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
interface pokemonData {
  name: string,
  image: string
}
const App = () => {
  const [pokemons, setPokemons] = useState<(pokemonData | undefined)[]>([])
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const scrollToTop = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon')

  }, [])

  const fetchPokemons = async (url: string | null) => {

    try {
      const result = await getPokemons(url! || 'https://pokeapi.co/api/v2/pokemon')
      setPrevPage(result.previous)
      setNextPage(result.next)
      const getData = result.results.map(async (pokemon) => {
        try {
          const result = await getPokemonImage(pokemon.url)
          const image = result.sprites.other.dream_world.front_default
          return { name: pokemon.name, image }
        } catch (error) {
          console.log(error)
        }
      })
      const newPokemonData = await Promise.all(getData);
      setPokemons(newPokemonData)

      if (scrollToTop.current) {
        scrollToTop.current.scrollTop = 0;
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div ref={scrollToTop} className="container h-screen border p-6 sm:p-[60px] bg-slate-300 dark:bg-primary-1 border-transparent rounded overflow-y-scroll">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
          {pokemons.map((pokemon, index) => (
            <Link key={index} to={`pokemon/${pokemon?.name}`}>
              <Card className="whitespace-pre-wrap bg-slate-100 dark:bg-transparent ring ring-slate-200 shadow-lg dark:ring-white " >
                <CardHeader className="text-slate-900 dark:text-white">
                  <CardTitle>{pokemon?.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center  justify-center">
                  <img src={pokemon?.image} className="w-48 h-48" alt="image" />
                </CardContent>
                <CardFooter className="text-white">
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="w-full text-slate-900 flex justify-between text-2xl py-12 sm:py-5">
          <button className="py-2 px-5 border bg-white border-slate-400 disabled:cursor-not-allowed rounded-lg" disabled={!prevPage} onClick={() => fetchPokemons(prevPage)}>Prev</button>
          <button className="py-2 px-5 border bg-white border-slate-400 disabled:cursor-not-allowed rounded-lg" disabled={!nextPage} onClick={() => fetchPokemons(nextPage)}>Next</button>
        </div>
      </div>
    </Layout>
  )
}

export default App