import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { default as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { backgrounds, pokeTypes } from "../../constants/constants";

const PokemonFilter = ({
  pokemonType,
  searchPokemon,
  searchText,
  updateSelectedType,
  clearSearchText,
  clearSelectedType,
  updateSearchText,
}: {
  pokemonType: string;
  searchPokemon: FormEventHandler<HTMLFormElement>;
  searchText: string;
  updateSelectedType: (data: string) => void;
  updateSearchText: (data: string) => void;
  clearSelectedType: MouseEventHandler<HTMLDivElement>;
  clearSearchText: MouseEventHandler<HTMLDivElement>;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const scrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      scrollRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      scrollRef.current.scrollLeft += 150;
    }
  };

  const generateIcon = (type: string) => {
    const Icon = pokeTypes[type] as any;
    return <Icon className="type-icon w-[16px] h-[16px]" />;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex justify-between pb-[3rem] filter-container">
      <div className="flex flex-col gap-5 type-filter-wrapper">
        <div className="text-xl font-bold">
          {pokemonType ? "Showing Results of type" : "Filter By Type"}
        </div>
        {!pokemonType ? (
          <div className="flex gap-1 ">
            <div
              style={{ opacity: canScrollLeft ? 1 : 0.5, cursor: "pointer" }}
            >
              <img src={ChevronLeft} />
            </div>
            <div
              className="flex gap-3 max-w-[32rem] overflow-scroll type-filter"
              ref={scrollRef}
            >
              {Object.keys(backgrounds)?.map((data) => (
                <div
                  color={backgrounds[data]}
                  className="flex gap-1 type cursor-pointer"
                  style={{
                    backgroundColor: backgrounds[data.toLowerCase()],
                  }}
                  onClick={() => updateSelectedType(data)}
                  key={data}
                >
                  {generateIcon(data)}
                  {data}
                </div>
              ))}
            </div>
            <div
              onClick={scrollRight}
              style={{ opacity: canScrollRight ? 1 : 0.5, cursor: "pointer" }}
            >
              <img src={ChevronRight} />
            </div>
          </div>
        ) : (
          <div className="flex gap-1">
            <div
              color={backgrounds[pokemonType]}
              className="flex gap-1 type cursor-pointer"
              style={{
                backgroundColor: backgrounds[pokemonType.toLowerCase()],
              }}
            >
              {generateIcon(pokemonType)}
              {pokemonType}
            </div>
            <div
              onClick={clearSelectedType}
              className="font-bold border w-[3rem] flex justify-center items-center rounded-lg cursor-pointer"
            >
              X
            </div>
          </div>
        )}
      </div>
      <form className="search-form relative" onSubmit={searchPokemon}>
        <input
          placeholder="Search Pokemon"
          value={searchText}
          onChange={(e) => updateSearchText(e.target.value)}
        />
        {searchText && (
          <div
            onClick={clearSearchText}
            className="absolute right-[5rem] top-[25%] font-bold"
          >
            X
          </div>
        )}
        <button className="search-button">
          <img src={SearchIcon} />
        </button>
      </form>
    </div>
  );
};
export default PokemonFilter;
