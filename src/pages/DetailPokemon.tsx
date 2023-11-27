import Layout from "@/components/Layout"
import { Card, CardTitle } from "@/components/ui/card"
import { getDetailPokemon } from "@/utils/apis/pokemons/api"
import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

interface filterData {
  abilities: string;
  height: number;
  moves: string[];
  stats: { base_stat: number; stat_name: string; }[];
  types: string[];
  weight: number;
  image: string
}

const DetailPokemon = () => {
  const [pokemon, setPokemon] = useState<filterData>()
  const { name } = useParams()

  useEffect(() => {
    getPokemon()
  }, [])

  const getPokemon = async () => {
    try {
      const result = await getDetailPokemon(name!)
      const filteredData: filterData = {
        abilities: result.abilities[0].ability.name,
        height: result.height,
        moves: result.moves.map((value) => value.move.name).slice(0, 5),
        stats: result.stats.map((value) => {
          const newValue = {
            base_stat: value.base_stat,
            stat_name: value.stat.name
          }
          return newValue
        }),
        types: result.types.map(value => value.type.name),
        weight: result.weight,
        image: result.sprites.other.dream_world.front_default
      }
      setPokemon(filteredData)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container h-screen border p-6 md:p-[60px] bg-slate-300 dark:bg-primary-1 border-transparent space-y-8 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-100 shadow-lg dark:bg-transparent flex flex-col justify-center items-center gap-y-8 ring-white ring">
            <img src={pokemon?.image} className="w-40 md:w-64 md:h-64" alt="" />
            <div className="flex items-center gap-x-10">
              {pokemon?.types.map((value, index) => (
                <span key={index} className="text-xl border rounded-lg p-3 text-white font-bold bg-sky-500">{value}</span>
              ))}
            </div>
          </Card>
          <Card className="bg-slate-100 shadow-lg dark:bg-transparent text-slate-900 dark:text-white flex flex-col  p-4 gap-y-2 ring-white ring">
            {pokemon?.stats.map((value, index) => (
              <div key={index}>
                <span className="text-sm font-semibold text-slate-900 dark:text-rose-500">
                  {value.stat_name}
                </span>
                <Progress.Root className="ProgressRoot border" value={value.base_stat}>
                  <Progress.Indicator
                    className="ProgressIndicator dark:bg-white bg-slate-500"
                    style={{ transform: `translateX(-${100 - value.base_stat}%)` }}
                  />
                </Progress.Root>
                <span className="text-xs font-bold">
                  {value.base_stat}
                </span>
              </div>
            ))}
          </Card>
        </div>
        <Card className="flex flex-col p-4 bg-slate-100 dark:bg-transparent text-slate-900 dark:text-white ring-white ring">
          <span className="text-lg font-bold">Name : {name}</span>
          <span className="text-lg font-bold">Weight : {pokemon?.weight}</span>
          <span className="text-lg font-bold">Height : {pokemon?.height}</span>
        </Card>
        <div className="flex items-stretch gap-8 pb-10">
          <Card className="w-1/2 bg-slate-100 dark:bg-transparent  dark:text-white text-xl font-semibold p-4 shadow-lg ring-white ring">
            <CardTitle className="text-slate-900 dark:text-rose-500">Ability</CardTitle>
            <p className="dark:text-white text-slate-900/70">{pokemon?.abilities}</p>
          </Card>
          <Card className="w-1/2 bg-slate-100 dark:bg-transparent  dark:text-white text-xl font-semibold p-4 ring-white ring">
            <CardTitle className="text-slate-900 dark:text-rose-500">Moves</CardTitle>
            {pokemon?.moves.map((value, index) => (
              <p key={index} className="dark:text-white text-slate-900/70">{value}  </p>
            ))}
          </Card>
        </div>
        <Link to={"/battle/" + name} className="py-24">
          <button className="p-4 border-2 rounded-lg translate-x-1/2 w-1/2 bg-rose-500 text-white font-bold active:scale-110 duration-100">Catch</button>
        </Link>
      </div>
    </Layout>
  )
}

export default DetailPokemon