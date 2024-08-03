import { IPokemon } from "../../types";
import "./pokemon-detail.scss";
import Lightening from "../../assets/icons/lightening.svg";
import { useEffect, useState } from "react";
import { getPokemonDescription } from "../../services/pokemons.service";
import { backgrounds, pokeTypes } from "../../constants/constants";
import Modal from "../modal/modal";

const PokemonDetail = ({ pokemon }: { pokemon: IPokemon }) => {
  const [pokemonDescription, setPokemonDescription] = useState<string>("");
  const types = pokemon.types.map((data) => data.type.name);
  const backgroundColor = backgrounds[types?.[0]?.toLowerCase()] || "white";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getPokemonDesc = async () => {
    try {
      const data: any = await getPokemonDescription(pokemon.id);
      const count =
        data.flavor_text_entries?.length > 3
          ? 3
          : data.flavor_text_entries?.length;
      const description = data.flavor_text_entries
        .filter((data: any) => data.language.name == "en")
        .slice(0, count)
        ?.map((val: any) => val.flavor_text)
        ?.join(" ");
      setPokemonDescription(description);
    } catch (error) {}
  };
  const generateIcon = (type: string) => {
    const Icon = pokeTypes[type];
    return <Icon width="16" height="16" className="type-icon" />;
  };

  useEffect(() => {
    pokemon && getPokemonDesc();
  }, [pokemon]);

  return (
    <div className="details-wrapper">
      <div className="main-container">
        <div className="content">
          <div className="pokemon-details">
            <div className="font-bold text-lg my-4">#{pokemon.id}</div>
            <div className="flex gap-3 types">
              {pokemon.types?.map((data) => (
                <div
                  color={backgroundColor}
                  className="flex gap-1 type"
                  style={{
                    backgroundColor: backgrounds[data.type.name.toLowerCase()],
                  }}
                  key={data.type.url}
                >
                  {generateIcon(data.type.name)}
                  {data.type.name}
                </div>
              ))}
            </div>
            <h1 className="pokemon-name">{pokemon?.name}</h1>
            <p className="text-md">{pokemonDescription}</p>

            <button
              className="more-button"
              style={{ color: backgroundColor }}
              onClick={() => setIsModalOpen(true)}
            >
              <Lightening
                style={{ backgroundColor }}
                className="rounded-full"
              />
              More Details
            </button>
          </div>
          <div className="center-image">{generateIcon(types[0])}</div>
          <div className="sc-papXJ iyQYLF">
            <img
              src={`${
                pokemon.sprites.other.dream_world.front_default ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
              }`}
              width="488"
              height="528"
              alt={pokemon?.name}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal pokemon={pokemon} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default PokemonDetail;
