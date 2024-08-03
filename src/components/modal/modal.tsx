import { IPokemon } from "../../types";
import "./modal.scss";
import CrossIcon from "../../assets/icons/cross-icon.svg";
import Pokeball from "../../assets/icons/pokeball.svg";
import { useEffect, useRef, useState } from "react";
import { backgrounds, pokeTypes } from "../../constants/constants";
import WeightIcon from "../../assets/icons/weight.svg";
import HeightIcon from "../../assets/icons/height.svg";

const Modal = ({
  pokemon,
  onClose,
}: {
  pokemon: IPokemon;
  onClose: () => void;
}) => {
  const types = pokemon.types?.map((data) => data.type.name);
  const backgroundColor = backgrounds[types?.[0]?.toLowerCase()] || "white";
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  const generateIcon = (type: string) => {
    const Icon = pokeTypes[type] as any;
    return <Icon className="type-icon w-[16px] h-[16px]" />;
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="pokemon-detail ">
          <div color="#ff9900" className="pokemon-detail-background"></div>
          <div className="image">
            {!imageLoaded && (
              <div className="w-[256px] h-[256px] skeleton"></div>
            )}
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
        </div>
        <div className="separator">
          <img src={Pokeball} />
        </div>
        <div className="stats-wrapper">
          <span className="stats-title">Stats</span>
          <ul className="stats-list-group">
            {pokemon?.stats.map((data) => (
              <li className="stats-list">
                <span>{data.stat.name}</span>
                <span>{data.base_stat}</span>
                <div className="bar">
                  <div
                    className={`filled-bar ${
                      data.base_stat > 50
                        ? `filled-positive`
                        : `filled-negative`
                    }`}
                    style={{ width: `${data.base_stat}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className="cross-icon" onClick={onClose}>
          <img src={CrossIcon} />
        </button>
      </div>
      <button className="cross-icon-mobile" onClick={onClose}>
        <img src={CrossIcon} />
      </button>
    </div>
  );
};
export default Modal;
