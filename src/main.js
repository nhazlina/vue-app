import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap 5 (CSS + JS bundle)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Pinia (state management)
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Router (page navigation)
import { router } from './router'

// Create app
const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Use plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')
