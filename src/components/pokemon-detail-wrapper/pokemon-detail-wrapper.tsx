import Logo from "../../assets/icons/Pokedex-logo.svg";
import MovingWaves from "../../assets/icons/moving-waves.svg";
import { IPokemon } from "../../types";
import PokemonDetail from "../pokemon-detail/pokemon-detail";
import "./pokemon-detail-wrapper.scss";

const PokemonDetailWrapper = ({ pokemon }: { pokemon: IPokemon }) => {
  return (
    <div className="poke-detail-container">
      <div className="p-6 max-w-[78rem] mx-auto">
        <Logo className="logo-container" />
        {pokemon && <PokemonDetail pokemon={pokemon} />}
      </div>
      <MovingWaves className="waves" />
    </div>
  );
};
export default PokemonDetailWrapper;
