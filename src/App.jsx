import { useEffect, useState } from 'react';
import './App.scss';

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [playerLoses, setPlayerLoses] = useState(false);
  const [playerWins, setPlayerWins] = useState(false);
  const [namesPicked, setNamesPicked] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const data = await Promise.all(
        [1, 4, 7, 10, 13, 16, 19, 21, 23, 25].map(async (n) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${n}/`
          );
          const data = await response.json();
          const name = `${data.name.charAt(0).toUpperCase()}${data.name.slice(
            1
          )}`;
          const imgUrl = data.sprites.front_default;
          return { name, imgUrl };
        })
      );

      setPokemon(data);
    }

    getPokemon();
  }, []);

  useEffect(() => {
    if (score === 10) {
      setPlayerWins(true);
    }
  }, [score]);

  return (
    <div className="app">
      <header>
        <h1>Memory Game</h1>
        <p className="score">Score: {score}</p>
        <p className="instructions">10 points wins the game</p>
      </header>
      <main>
        {pokemon && !playerLoses && !playerWins && (
          <div className="game">
            {pokemon.map((p) => (
              <button
                type="button"
                className="card"
                key={p.name}
                onClick={() => {
                  if (namesPicked.includes(p.name)) {
                    setPlayerLoses(true);
                  } else {
                    setNamesPicked([...namesPicked, p.name]);
                    setScore(score + 1);
                    setPokemon(shuffle(pokemon));
                  }
                }}
              >
                <h2>{p.name}</h2>
                <img src={p.imgUrl} alt={p.name} />
              </button>
            ))}
          </div>
        )}

        {(playerLoses || playerWins) && (
          <div className="lost-game">
            {playerLoses && <p>Oh no you lost 🥺</p>}
            {playerWins && <p>🥳 You won! 🥳</p>}
            <button
              type="button"
              onClick={() => {
                setPlayerLoses(false);
                setPlayerWins(false);
                setScore(0);
                setNamesPicked([]);
              }}
            >
              Play again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
