# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
Pokédex App

Features

-   List of first 100 Pokémon
-   Search Pokémon by name
-   Detail page : name, artwork, height, weight, experience, types,
    abilities
-   Edit details via Bootstrap modal(local Pinia store update)
-   Responsive UI with Bootstrap 5
-   Fast dev reload with Vite

------------------------------------------------------------------------

Tech Stack

-   Vue 3 (Composition API, `<script setup>`)\
-   Vite (frontend build tool)\
-   Pinia (state management)\
-   Vue Router (page navigation)\
-   Bootstrap 5 (styling)

------------------------------------------------------------------------

Setup

1.  Clone repo

    bash
    git clone https://github.com/nhazlina/vue-app.git
    cd pokedex-app
    

2.  Install dependencies

    bash
    npm install
    

3.  Run dev server

    bash
    npm run dev
    
    → open <http://localhost:5173>\

4.  Build for production

    bash
    npm run build
    

------------------------------------------------------------------------

Structure

    src/
      components/   → Reusable UI
      pages/        → Home, PokemonDetail
      stores/       → Pinia store
      App.vue       → Root component
      main.js       → Entry point

------------------------------------------------------------------------

Notes

-   Edited Pokémon info is not saved to API, only local state.
-   Uses PokéAPI for data.


