import React, { useEffect, useState } from "react";
import "./Main.css";

const Main = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);

  // Fetch the list of Pokémon names and URLs (first step)
  const fetchPokemonList = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const data = await response.json();
      fetchAllPokemonDetails(data.results); // Pass the basic list to the next step
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    }
  };

  // Fetch the details for each Pokémon (second step)
  const fetchPokemonDetails = async (pokemon) => {
    try {
      const response = await fetch(pokemon.url); // Fetch the details from the Pokémon's URL
      const details = await response.json();
      return details; // Return the detailed data (like sprites)
    } catch (error) {
      console.error(`Error fetching details for ${pokemon.name}:`, error);
    }
  };

  // Fetch details for all Pokémon one by one (third step)
  const fetchAllPokemonDetails = async (pokemonList) => {
    const detailedPokemonList = [];

    for (const pokemon of pokemonList) {
      const details = await fetchPokemonDetails(pokemon); // Fetch each Pokémon’s details
      if (details) {
        detailedPokemonList.push(details); // Add the details to the list if successful
      }
    }

    setPokemonList(detailedPokemonList); // Update the state with the detailed data
  };

  // This useEffect runs once when the component is loaded
  useEffect(() => {
    fetchPokemonList(); // Start by fetching the list of Pokémon
  }, []);

  // Filter Pokémon based on the search term
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-container">
      {filteredPokemon.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="more-info">
            <p>
              <strong>Type</strong>
              <div>{pokemon.types.map((type) => type.type.name).join(", ")}</div>
            </p>
          </div>
          <div className="more-info">
            <p>
              <strong>Abilities</strong>
              <div>
                {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
              </div>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
