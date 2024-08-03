import { backgrounds, pokeTypes } from "../../constants/constants";
import { IPokemon } from "../../types";
import "./pokemon-card.scss";
import LighteningIcon from "../../assets/icons/lightening.svg";
import WeightIcon from "../../assets/icons/weight.svg";
import HeightIcon from "../../assets/icons/height.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import Modal from "../modal/modal";

const Card = ({ pokemon }: { pokemon: IPokemon }) => {
  const types = pokemon.types?.map((data) => data.type.name);
  const backgroundColor = backgrounds[types?.[0]?.toLowerCase()] || "white";
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  const generateIcon = (type: string) => {
    const Icon = pokeTypes[type];
    return (
      <div className="type-icon w-[16px] h-[16px]">
        <img src={Icon} />
      </div>
    );
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (ref.current) {
      if (ref.current.complete) {
        handleImageLoad();
      } else {
        ref.current && ref.current.addEventListener("load", handleImageLoad);
        return () => {
          ref.current &&
            ref.current!.removeEventListener("load", handleImageLoad);
        };
      }
    }
  }, []);

  return (
    <Fragment>
      <div className="card-wrapper">
        <div color={backgroundColor} className={`${types?.[0]} card`}></div>
        <div className="absolute top-[-10.5rem]">
          {!imageLoaded && <div className="w-[256px] h-[256px] skeleton"></div>}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            width="256"
            height="256"
            ref={ref}
            style={{ display: imageLoaded ? "block" : "none" }}
            alt={pokemon.name}
          />
        </div>
        <div className="pokeid">#{pokemon?.id}</div>
        <div className="pokename">{pokemon.name}</div>
        <div className="flex gap-3">
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
        <div className="flex gap-4 my-6 flex-1">
          <div className="flex flex-col  items-center justify-center">
            <div className="flex gap-2 ">
              <img src={WeightIcon} />
              <span className="font-semibold">{pokemon.weight} kg</span>
            </div>
            <span>Weight</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-2">
              <img src={HeightIcon} />
              <span className="font-semibold">{pokemon.height} m</span>
            </div>
            <span>Height</span>
          </div>
        </div>
        <button
          className="more-details"
          style={{ backgroundColor }}
          onClick={() => setIsModalOpen(true)}
        >
          <img src={LighteningIcon} />
          More details
        </button>
      </div>
      {isModalOpen && (
        <Modal pokemon={pokemon} onClose={() => setIsModalOpen(false)} />
      )}
    </Fragment>
  );
};
export default Card;
