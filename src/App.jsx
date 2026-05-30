import './index.css';
import { useState, useEffect, useCallback } from 'react';

//mi scrivo la funzione di debounceà
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
}
function App() {
  const API_URL = "http://localhost:3333";

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  //riuso la funzione di debounce
  const debouncedFetch = useCallback(
    debounce((text) => {

      fetch(`${API_URL}/products?search=${text}`)
        .then(res => res.json())
        .then(data => setSuggestions(data));


    }, 200),
    []
  )


  useEffect(() => {
    debouncedFetch(query);
  },[query, debouncedFetch]);
  console.log("Stato attuale -> Query:", query, "Suggerimenti:", suggestions);


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

/* 📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca

    Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
    Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
    Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni. */