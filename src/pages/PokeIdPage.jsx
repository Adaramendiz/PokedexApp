import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "../components/PokedexPage/styles/IdPokeCard.css";

const PokeIdPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon();
  }, [id]);

  const firstType = pokemon?.types[0].type.name;

  return (
    <>
      <div className="container__header">
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
      </div>
      <div className={`container ${firstType}-border`}>
        <div className={`container_poke ${firstType}-gradient`}>
          <div className="poke-id-img">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>

          <h1 className="poke-num">#{pokemon?.id}</h1>

          <h2 className="poke-title">{pokemon?.name}</h2>

          <div className="poke-wht">
            <p>Weight: {pokemon?.weight}</p>

            <p>Height: {pokemon?.height}</p>

            <p>Type: {pokemon?.types[0].type.name}</p>
          </div>

          <br />

          <p className="poke-abilities">
            Abilites:
            <p>{pokemon?.abilities[0].ability.name}</p>
            <p>{pokemon?.abilities[1].ability.name}</p>
          </p>

          <br />

          <div className="poke__stats">
            Stats:
            {pokemon?.stats.map((statInfo) => (
              <div key={statInfo.stat.url}>
                <p className="poke-stats">
                  {statInfo.stat.name}: <span>{statInfo.base_stat}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokeIdPage;
