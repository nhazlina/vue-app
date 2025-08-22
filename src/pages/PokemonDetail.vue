<template>
    <div class="py-4" style="background: linear-gradient(135deg, #8c3766, #3b4cca); min-height: 100vh;"> 
    <div class="container my-4">
        <!-- Back button -->
        <button 
            class="btn mb-3 px-4 py-2 text-white"
            style="
                backdrop-filter: blur(10px);
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            "
            @click="$router.back()"
            >
            Back
        </button>


    <!-- Loader -->
    <div v-if="loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Details Card -->
    <div v-else class="card shadow-lg p-4 mx-auto text-white" style="max-width: 600px; background-color: rgba(0,0,0,0.7);">

      <div class="text-center">
        <h2 class="text-capitalize mb-3">{{ pokemon.name }}</h2>

        <!-- Spinner shown while artwork is loading -->
        <div v-if="!imageLoaded" class="d-flex justify-content-center my-3">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading image...</span>
        </div>
        </div>

        <!-- Small sprite shown instantly -->
        <img
        v-if="!imageLoaded && pokemon.sprites?.front_default"
        :src="pokemon.sprites.front_default"
        alt="pokemon small"
        class="img-fluid mb-3"
        style="max-height: 120px;"
        />

        <!-- Official artwork (always rendered if exists) -->
        <img
        v-if="pokemon.sprites?.other['official-artwork'].front_default"
        :src="pokemon.sprites.other['official-artwork'].front_default"
        alt="pokemon artwork"
        class="img-fluid mb-3"
        style="max-height: 200px;"
        :class="{ 'd-none': !imageLoaded }"
        @load="imageLoaded = true"
        />
      </div>


      <div class="row">
        <div class="col-6">
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        </div>
        <div class="col-6">
          <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          <p>
            <strong>Types:</strong>
            <span
              v-for="t in pokemon.types"
              :key="t.slot"
              class="badge bg-primary me-1"
            >
              {{ t.type.name }}
            </span>
          </p>
        </div>
      </div>

      <hr />

      <div>
        <h5>Abilities</h5>
        <ul>
          <li v-for="a in pokemon.abilities" :key="a.ability.name">
            {{ a.ability.name }}
          </li>
        </ul>
      </div>
      
    <!-- Edit Button -->
    <button 
        class="btn mb-3 px-4 py-2 text-white"
        style="
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        "
        data-bs-toggle="modal" 
        data-bs-target="#editModal"
        >
        Edit Pokémon
    </button>

    </div>

    <!-- Bootstrap Modal -->
    <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
    >
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Pokémon</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="saveEdit">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="editForm.name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Height</label>
                <input v-model="editForm.height" type="number" class="form-control" />
            </div>
            <div class="mb-3">
                <label class="form-label">Weight</label>
                <input v-model="editForm.weight" type="number" class="form-control" />
            </div>
            <button type="submit" class="btn mb-3 px-4 py-2 text-black"
            style="
                backdrop-filter: blur(10px);
                background:lightgrey;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            " data-bs-dismiss="modal">
            Save
            </button>
            
            </form>
        </div>
        </div>
    </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'

const route = useRoute()
const store = usePokemonStore()
const pokemon = ref({})
const loading = ref(true)
const imageLoaded = ref(false) // track image loading

const editForm = ref({
  name: '',
  height: 0,
  weight: 0
})

function openEditForm() {
  editForm.value = {
    name: pokemon.value.name,
    height: pokemon.value.height,
    weight: pokemon.value.weight
  }
}

function saveEdit() {
  // Update local Pinia store with new values
  pokemon.value.name = editForm.value.name
  pokemon.value.height = editForm.value.height
  pokemon.value.weight = editForm.value.weight

  store.details[route.params.id] = { ...pokemon.value }

  alert("Pokémon info updated locally in Pinia store!")
}

onMounted(async () => {
  let data = null
  try {
    data = await store.fetchPokemonDetail(route.params.id)
    if (data) {
      pokemon.value = data
    } else {
      console.error("No data returned for this Pokémon ID:", route.params.id)
    }
  } catch (err) {
    console.error("Error fetching Pokémon details:", err)
  } finally {
    console.log("Fetched data:", data)
    loading.value = false // always stop loading, even if error
  }
})



</script>
