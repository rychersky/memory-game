import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <>
      {data ? <p onClick={() => console.log(data)}>test</p> : <p>loading</p>}
      <p>stuff</p>
    </>
  );
}

const numbers = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25];
