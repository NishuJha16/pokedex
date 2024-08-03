import axios from "axios";

export const getAllPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset * limit}`
  );
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

export const getPokemonByType = async (type: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data;
};

export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
export const getPokemonDescription = async (id: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data;
};
