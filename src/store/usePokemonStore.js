import { create } from "zustand";
import pokeAPI from "../api/pokeAPI.js";
import axios from "axios";

export const usePokemonStore = create((set, get) => ({
  pokemonList: [],
  isFetchNextPage: false,
  isLoading: false,
  offset: 0,
  limit: 6,

  getAllPokemon: async (isNextPage = false) => {
    if (isNextPage) {
      set({ isFetchNextPage: true });
    } else {
      set({ isLoading: true, offset: 0, pokemonList: [] });
    }

    try {
      const currentOffset = isNextPage ? get().offset + get().limit : 0;
      const response = await pokeAPI.get(
        `/pokemon?limit=${get().limit}&offset=${currentOffset}`
      );
      const detailedData = await Promise.all(
        response.data.results.map(async (poke) => {
          const id = poke.url.split("/").filter(Boolean).pop();
          const res = await pokeAPI.get(`/pokemon/${id}`);
          return res.data;
        })
      );

      set((state) => ({
        pokemonList: isNextPage
          ? [...state.pokemonList, ...detailedData]
          : detailedData,
        offset: currentOffset,
      }));
    } catch (err) {
      console.log("Error get all pokemon: ", err);
    } finally {
      set({ isLoading: false, isFetchNextPage: false });
    }
  },

  searchPokemon: async (query) => {
    if (!query) return;

    set({ isLoading: true });
    try {
      const response = await pokeAPI.get(`/pokemon/${query.toLowerCase()}`);
      set({ pokemonList: [response.data] });
    } catch (error) {
      console.error("Pokemon not found");
    } finally {
      set({ isLoading: false });
    }
  },

  getEvolutionChain: async (speciesUrl) => {
    try {
      const speciesRes = await axios.get(speciesUrl);
      const evolutionRes = await axios.get(speciesRes.data.evolution_chain.url);

      let chain = [];
      let current = evolutionRes.data.chain;

      while (current) {
        const id = current.species.url.split("/").filter(Boolean).pop();
        chain.push({
          name: current.species.name,
          id: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        });
        current = current.evolves_to[0];
      }
      return chain;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));
