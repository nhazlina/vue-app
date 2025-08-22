import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PokemonDetail from '../pages/PokemonDetail.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/pokemon/:id', name: 'pokemon', component: PokemonDetail, props: true }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
