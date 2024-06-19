import { useEffect, useState } from 'react';

const numbers = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25];

export default function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const result = [];

    numbers.forEach((num) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
        .then((res) => res.json())
        .then((data) => result.push(data));
    });

    setPokemon(result);
  }, []);

  return (
    <>
      {pokemon.length ? <p>done</p> : <p>loading</p>}
      <p
        onClick={() => {
          console.log('⬜️⬜️⬜️⬜️⬜️');
          console.log('numbers:', numbers);
          console.log('pokemon:', pokemon);
          console.log(pokemon.length === numbers.length);
        }}
      >
        pokemon length: {pokemon.length}
      </p>
      <p>numbers length: {numbers.length}</p>
    </>
  );
}
