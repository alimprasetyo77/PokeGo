import { DetailPokemon, PokemonIMG } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "@/utils/types/api"
import axios from "axios"
import { Pokemon } from "./types"


export const getPokemons = async (url: string) => {
  try {
    const response = await axios.get(`${url}`)
    return response.data as Response<Pokemon[]>
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export const getPokemonImage = async (pokemonURL: string) => {
  try {
    const response = await axios.get(`${pokemonURL}`);
    return response.data as PokemonIMG
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
export const getDetailPokemon = async (pokemonName: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    return response.data as DetailPokemon
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}