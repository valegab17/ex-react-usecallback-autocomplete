import './index.css';
import { useState, useEffect, useMemo, memo } from 'react';
function App() {
  const API_URL = "http://localhost:3333";

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  console.log("Stato attuale -> Query:", query, "Suggerimenti:", suggestions);
  useEffect(() => {
    fetch(`${API_URL}/products?search=${query}`)
      .then(res => res.json())
      .then(data => setSuggestions(data));
  }, [query])

  return (
    <>
      <div className='card'>
        <h1 className="title">Boomazon </h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="suggestions">
          {query.length > 0 && (
            <ul>
              {suggestions.map((i) => (
                <li key={i.id}>{i.name}
                  <img src={i.image}
                    alt={i.name}
                    />
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

    </>
  )
}

export default App

