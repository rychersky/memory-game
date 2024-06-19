import { useEffect, useState } from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    async function getPokemon() {
      const data = await Promise.all(
        [1, 4, 7, 10, 13, 16, 19, 21, 23, 25].map(async (n) => {
          const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}/`);
          return data.json();
        })
      );

      setPokemon(data);
    }

    getPokemon();
  }, []);

  return <>{pokemon ? <p>finished</p> : <p>loading</p>}</>;
}
