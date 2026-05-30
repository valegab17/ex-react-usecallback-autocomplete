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
  const [selectedProducts, setSelectedProducts] = useState(null);
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
  }, [query, debouncedFetch]);
  console.log("Stato attuale -> Query:", query, "Suggerimenti:", suggestions);

  const fetchProductDetails = async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`)
      const data = await res.json();
      setSelectedProducts(data);
    } catch (error) {
      console.error(error)
    }
  }
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
                <li key={i.id} onClick={() => {
                  fetchProductDetails(i.id); 
                  setQuery('');              
                  setSuggestions([]);       
                }}>{i.name}

                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
      {selectedProducts && (
        <div className='selectedCard'>
          <h2>{selectedProducts.name}</h2>
          <img src={selectedProducts.image} alt={selectedProducts.name} />
          <p>{selectedProducts.description}</p>
          <p><strong>Prezzo: </strong> {selectedProducts.price} €</p>
        </div>
      )}

    </>
  )
}

export default App

/* 🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato

    Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.

    Effettua una richiesta API per ottenere i dettagli completi:
    /products/{id}

    Mostra i dettagli del prodotto selezionato (es. image, name, description, price).


Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.
 */