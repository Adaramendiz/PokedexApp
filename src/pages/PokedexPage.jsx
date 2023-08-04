import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import Pagination from "../components/Pagination";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [pokemonsPage, setPokemonsPage] = useState([]);

  const totalPokemons = pokemonsPage.length;

  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;

  const PokedexPage = async () => {
    const data = await fetch(url);
    const pokemonsPage = await data.json();

    setPokemonsPage(pokemonsPage.results);
  };

  useEffect(() => {
    PokedexPage();
  }, []);

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";

  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

  return (
    <div>
      <header className="pokepage__container-img">
        <img
          className="pokepage__img-red"
          src="https://i.imgur.com/8zjD6W9.png"
          alt=""
        />
        <img
          className="pokepage__img-black"
          src="https://i.imgur.com/FI3WYRw.png"
          alt=""
        />
        <img
          className="pokepage__img-circle"
          src="https://i.imgur.com/FOK4yeT.png"
          alt=""
        />
        <img
          className="pokepage__logo"
          src="https://i.imgur.com/Xw6e0wG.png"
          alt=""
        />
      </header>
      <p className="pokedex__page">
        <span className="pokedex__page-welcome"> Welcome {trainer}</span>, here
        you can find your favorite pokemon
      </p>

      <form onSubmit={handleSubmit}>
        <input ref={inputSearch} type="text" />
        <button>Search</button>
        <SelectType setSelectValue={setSelectValue} />
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPokemons={totalPokemons}
        />
      </form>
      <div className="card-container">
        {pokemons?.results
          .filter(cbFilter)
          .map((poke) => <PokeCard key={poke.url} url={poke.url} />)
          .slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPokemons={totalPokemons}
      />
    </div>
  );
};

export default PokedexPage;
