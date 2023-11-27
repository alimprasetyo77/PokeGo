/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/Layout"
import battleground from "../../public/images/battleground.jpg"
import { getPokemonImage } from "@/utils/apis/pokemons/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "@/components/Modal"


interface PromiseType {
  status: string,
  message: string
}

const Battle = () => {
  const [response, setResponse] = useState<PromiseType>()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const { name } = useParams()

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = async () => {
    try {
      const result = await getPokemonImage(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const getImage = result.sprites.other.home.front_default
      setImageUrl(getImage)
    } catch (error) {
      console.log(error)
    }
  }

  const catchRun = () => {
    return new Promise<PromiseType>((resolve, rejects) => {

      const randomNum = +(Math.random() * 100).toFixed(0);

      setTimeout(() => {
        if (randomNum > 50) {
          resolve({
            status: "success",
            message: "congratulation! you caught " + name
          })
        } else {
          rejects({
            status: "failed",
            message: "You missed"
          })
        }
      }, 200)
    })
  }


  const playGame = async () => {
    setIsLoading(true)
    try {
      const response = await catchRun()
      setResponse(response)
      setIsLoading(false)

    } catch (error: any) {
      alert(error.message)
      setIsLoading(false)

    }
  }


  return (
    <Layout>
      <div className="container h-screen bg-red-50 p-0 relative">

        {response?.status === "success" &&
          <div className="fixed inset-0 bg-black/20 z-10">
            <Modal message={response.message} image={imageUrl} name={name!} />
          </div>
        }
        <img src={imageUrl} alt="pokemon" className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-48 h-48" />
        <img src={battleground} alt="background" className="w-full h-full object-cover " />
        <div className="absolute bottom-10 right-1/2 translate-x-1/2 gap-6 md:gap-16 flex flex-col md:flex-row pb-16 ">
          <button className=" w-48 sm:w-72 p-4 rounded-lg bg-sky-500 ring-1 ring-white text-white font-bold font-mono">What will you do ?</button>
          <button className="w-48 sm:w-72 p-4 rounded-lg bg-amber-500 ring-1 ring-white text-white font-bold font-mono disabled:cursor-wait" disabled={isLoading} onClick={playGame}>Catch Run</button>
        </div>
      </div>
    </Layout>
  )
}

export default Battle