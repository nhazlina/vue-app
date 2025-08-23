<template>
  <div class="container my-4">
    <h1 class="h3 mb-3">Pokémon List</h1>

    <div class="text-center my-4">
        <h1 class="display-4 fw-bold" style="color: #522f59">Pokédex</h1>
        <p class="lead text-muted">Explore the first 100 Pokémon. Click to learn more!</p>
    </div>


    <!-- Search box -->
    <div class="input-group mb-4">
        <span class="input-group-text">🔍</span>
        <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search Pokémon by name..."
        />
    </div>


    <!-- Loader -->
    <div v-if="store.loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-if="store.error" class="alert alert-danger">
      {{ store.error }}
    </div>

    <!-- Pokémon grid -->
    <div class="row g-3" v-if="!store.loading && !store.error && filteredPokemons.length > 0">
        <div
            v-for="p in filteredPokemons"
            :key="p.id"
            class="col-6 col-md-3"
        >
            <!-- Clickable card -->
            <div
                class="card h-100 shadow-sm text-center border-0"
                role="button"
                @click="goToDetail(p.id)"
                style="transition: transform 0.2s;"
                @mouseover="hover = p.id"
                @mouseleave="hover = null"
                :style="{ transform: hover === p.id ? 'scale(1.05)' : 'scale(1)' }"
            >
            <img
                :src="sprite(p.id)"
                class="card-img-top mx-auto mt-3"
                alt="pokemon"
                style="width:100px; height:100px"
            />
            <div class="card-body">
                <h5 class="card-title text-capitalize">
                    {{ store.details[p.id]?.name || p.name }}
                </h5>

                <!-- Summary -->
                 <p class="card-text text-truncate" style="max-height: 40px; overflow: hidden;">
                    {{ summaries[p.id] || 'Loading summary...' }}
                 </p>
            </div>
            </div>
        </div>
    </div>

    <!-- Fallback message goes here -->
    <div v-if="!store.loading && !store.error && filteredPokemons.length === 0">
        <p class="text-muted">No Pokémon loaded. Try refreshing.</p>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useRouter } from 'vue-router'

const store = usePokemonStore()
const search = ref('')
const router = useRouter()
const hover = ref(null)
const summaries = ref({}) 

async function loadSummaries(){
    for (let i = 1; i <= 100; i++){
        const text = await store.fetchPokemonSpecies(i)
        summaries.value[i] = text
    }
}


function goToDetail(id) {
  router.push(`/pokemon/${id}`)
}

// Fetch data on page load
onMounted(() => {
    loadSummaries()
    store.fetchPokemons()
})

// Filter computed property
const filteredPokemons = computed(() =>
  store.pokemons.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Helper for images
const sprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
</script>
