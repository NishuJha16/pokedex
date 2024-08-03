import { useState } from "react";
import PokemonHomeDetail from "../../components/pokemon-detail-wrapper/pokemon-detail-wrapper";
import { IPokemon } from "../../types";
import PokemonList from "../pokemon-list/pokemon-list";
const MainLayout = () => {
  const [starPokemon, setStarPokemon] = useState<IPokemon>();

  const updateStarPokemon = (pokemon: IPokemon) => {
    setStarPokemon(pokemon);
  };

  return (
    <div className="page-main-container">
      {starPokemon && <PokemonHomeDetail pokemon={starPokemon} />}
      <PokemonList updateStarPokemon={updateStarPokemon} />
    </div>
  );
};
export default MainLayout;
