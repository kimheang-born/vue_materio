/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import store from './store/index'

// Components
import BaseButton from './components/ui/BaseButton.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

loadFonts()

// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(store)

// Components
app.component('BaseButton', BaseButton)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseDialog', BaseDialog)

// Mount vue app
app.mount('#app')
