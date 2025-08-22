import { defineStore } from 'pinia'

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
        // Add IDs so your sprite() helper works
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
    }
  }
})
