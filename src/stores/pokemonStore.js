import { defineStore } from 'pinia'
import axios from 'axios'  

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],     // list of pokemons
    details: {},      // detail cache
    loading: false,   // loading flag
    error: null       // error message
  }),
  persist: true,
  actions: {
    async fetchPokemons() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        if (!res.ok) throw new Error("Failed to fetch Pokémon list")
        const data = await res.json()
        // Add IDs so sprite() helper works
        this.pokemons = data.results.map((p, index) => ({
          id: index + 1,
          name: p.name,
          url: p.url
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchPokemonDetail(id) {
      if (!this.details[id]) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!res.ok) throw new Error("Failed to fetch Pokémon")
        const data = await res.json()
        this.details[id] = data
      }
      return this.details[id]
    },

    async fetchPokemonSpecies(id) {
      try {
        if (!id) {
          console.warn("Invalid Pokémon ID:", id)
          return 'No description available.'
        }

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        const entries = res.data.flavor_text_entries || []

        const englishEntries = entries.filter((e) => e.language.name === 'en')

        if (englishEntries.length > 0) {
          return englishEntries[0].flavor_text.replace(/\n|\f/g, ' ')
        }

        return 'No description available.'
      } catch (err) {
        console.error("Failed to fetch species for ID:", id, err)
        return 'No description available.'
      }
    }
  }
})
