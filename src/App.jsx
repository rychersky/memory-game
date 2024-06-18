import { useEffect, useState } from 'react';

const numbers = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25];

export default function App() {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = [];

    numbers.forEach((num) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
        .then((res) => res.json())
        .then((data) => result.push(data));
    });

    setPokemon(result);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <p>loading</p> : <p>done</p>}
      <p
        onClick={() => {
          console.log('⬜️⬜️⬜️⬜️⬜️');
          console.log('numbers:', numbers);
          console.log('pokemon:', pokemon);
          console.log(pokemon?.length >= numbers.length);
        }}
      >
        pokemon length: {pokemon?.length}
      </p>
      <p>numbers length: {numbers.length}</p>
    </>
  );
}
