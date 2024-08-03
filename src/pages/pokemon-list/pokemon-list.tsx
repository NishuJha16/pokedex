import { useEffect, useRef, useState } from "react";
import {
  getAllPokemons,
  getPokemonByName,
  getPokemonByType,
  getPokemonDetails,
} from "../../services/pokemons.service";
import Card from "../../components/pokemon-card/pokemon-card";
import { IPokemon } from "../../types";
import "./pokemon-list.scss";
import Pagination from "../../components/pagination/pagination";
import LoaderIcon from "../../assets/icons/loader.svg";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import TopIcon from "../../assets/icons/arrow-top.svg";
import { backgrounds, pokeTypes } from "../../constants/constants";
import PokemonFilter from "./pokemon-filter";

const PokemonList = ({
  updateStarPokemon,
}: {
  updateStarPokemon: (data: IPokemon) => void;
}) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 9;
  const [loading, setLoading] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<string>("");
  const [filterResultLimit, setFilterResultLimit] = useState<any>({
    start: 0,
    end: 0,
  });

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const getPokemonsList = async () => {
    setLoading(true);
    try {
      const data = await getAllPokemons(limit, currentPage - 1);
      setTotalPokemons(data.count);
      const updatedData = await Promise.all(
        data?.results?.map((data: any) => getPokemonDetails(data.url))
      );
      setPokemons(updatedData);
      updateStarPokemon(updatedData[0]);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async (event: any) => {
    pokemonType && setPokemonType("");
    event.preventDefault();
    if (!searchText) {
      clearSearchText();
      return;
    }
    setLoading(true);
    try {
      const data = await getPokemonByName(searchText);
      setTotalPokemons(1);
      setPokemons([data]);
    } catch (error) {
      setTotalPokemons(0);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemonByType = async (type: string) => {
    searchText && setSearchText("");
    setLoading(true);
    try {
      const data = await getPokemonByType(type);
      setTotalPokemons(data.pokemon.length);

      const updatedData = await Promise.all(
        data?.pokemon
          ?.slice(0, 9)
          ?.map((data: any) => getPokemonDetails(data.pokemon.url))
      );
      setFilterResultLimit({
        start: 0,
        end: 9,
      });
      setPokemons(updatedData);
    } catch (error) {
      setTotalPokemons(0);
    } finally {
      setLoading(false);
    }
  };

  const showMorePokemons = async () => {
    const start = filterResultLimit.end;
    const end = start + 9;
    setFilterResultLimit({
      start,
      end,
    });
    setLoading(true);
    try {
      const data = await getPokemonByType(pokemonType);
      setTotalPokemons(data.pokemon.length);
      const updatedData = await Promise.all(
        data?.pokemon
          ?.slice(start, end)
          ?.map((data: any) => getPokemonDetails(data.pokemon.url))
      );
      setPokemons((prevData) => [...prevData, ...updatedData]);
    } catch (error) {
      setTotalPokemons(0);
    } finally {
      setLoading(false);
    }
  };

  const updateSelectedType = (type: string) => {
    setPokemonType(type);
    filterPokemonByType(type);
  };

  const clearSelectedType = () => {
    setPokemonType("");
    getPokemonsList();
  };

  const clearSearchText = () => {
    setSearchText("");
    setCurrentPage(1);
    getPokemonsList();
  };

  useEffect(() => {
    getPokemonsList();
  }, [currentPage]);

  useEffect(() => {
    scrollToBottom();
  }, [pokemons.length]);

  return (
    <div className="p-2 mb-4 max-w-[78rem] mx-auto" ref={topRef}>
      <PokemonFilter
        pokemonType={pokemonType}
        searchText={searchText}
        searchPokemon={searchPokemon}
        updateSearchText={setSearchText}
        updateSelectedType={updateSelectedType}
        clearSearchText={clearSearchText}
        clearSelectedType={clearSelectedType}
      />
      {(loading && pokemonType) || (totalPokemons && !loading) ? (
        <div className="view">
          {pokemons?.map((data: IPokemon, index) => (
            <Card key={index} pokemon={data} />
          ))}
        </div>
      ) : (
        !totalPokemons && (
          <div className="flex justify-center items-center flex-1 min-h-[20rem]">
            <div className="not-found-message"> Oops!! Pokemon not found</div>
          </div>
        )
      )}
      {loading && (
        <div className="flex justify-center items-center flex-1 loading-screen">
          <LoaderIcon className="w-[150px] h-[150px]" />
        </div>
      )}

      {pokemonType && filterResultLimit.end < totalPokemons && (
        <div className="flex justify-center items-center gap-6">
          <div ref={bottomRef} />
          <button
            className="px-6 flex gap-2 py-3 font-semibold rounded-lg show-more-button"
            onClick={showMorePokemons}
          >
            <PlusIcon />
            Show more results
          </button>
          <button
            className="px-3 py-3 rounded-lg show-more-button"
            onClick={scrollToTop}
          >
            <TopIcon />
          </button>
        </div>
      )}

      {!loading && !pokemonType && (
        <Pagination
          totalCount={totalPokemons}
          limit={9}
          activePageIndex={currentPage}
          updatePage={(data) => setCurrentPage(data)}
        />
      )}
    </div>
  );
};
export default PokemonList;