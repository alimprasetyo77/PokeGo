import usePokemonStore from "@/utils/state"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface props {
  message: string
  image: string,
  name: string
}

const Modal = ({ message, image, name }: props) => {
  const [nickName, setNickName] = useState("")
  const { data, addPokemon } = usePokemonStore()
  const navigate = useNavigate()

  const handleSubmit = () => {
    const check = data.some(value => value.nickname === nickName)
    if (!check) {
      addPokemon(nickName, name, image)
      navigate("/my-pokemon")
    } else {
      alert(`nickname ${nickName} already exist!`)
    }
  }

  return (
    <div className="fixed top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-20  border-2 rounded-lg p-8 bg-primary">
      <div className="flex flex-col gap-y-5">
        <p className="text-white font-bold text-xl font-mono uppercase">{message}</p>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="nickname" className="text-white text-xl font-mono">Nickname</label>
          <input type="text" className="bg-white rounded-lg p-4 font-semibold focus:ring-4 ring-sky-500 outline-none font-mono" onChange={(e) => setNickName(e.target.value)} />
        </div>
        <div className="flex justify-center">
          <button className="text-white font-mono font-semibold text-xl ring-2 ring-white rounded-lg bg-teal-500 py-2 px-4" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Modal