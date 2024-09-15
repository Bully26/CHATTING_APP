import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store/data.js'
import router from "./router/router.js"





// this is just a comments
loadFonts()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')
