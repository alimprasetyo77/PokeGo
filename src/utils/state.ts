import { create } from "zustand";

interface PokemonData {
  nickname: string;
  name: string;
  image: string;
}
interface PokemonStore {
  data: PokemonData[];
  addPokemon: (nickName: string, name: string, image: string) => void;
  deletePokemon: (nickName: string) => void;
}

const storedData = localStorage.getItem('pokemonData');
const initialData = storedData ? JSON.parse(storedData) : [];

const usePokemonStore = create<PokemonStore>((set) => ({
  data: initialData,
  addPokemon: (nickName, name, image) => {
    const newData = {
      nickname: nickName,
      name: name,
      image: image
    }

    set((state) => {
      localStorage.setItem('pokemonData', JSON.stringify([...state.data, newData]));
      return { data: [...state.data, newData] };
    });
  },

  deletePokemon: (nickname) => {
    set(state => {
      const index = state.data.findIndex((value) => value.nickname === nickname);

      if (index !== -1) {
        state.data.splice(index, 1);
        localStorage.setItem("pokemonData", JSON.stringify(state.data));

        return { ...state, data: state.data };
      }

      return state;
    })
  },
}));

export default usePokemonStore;
