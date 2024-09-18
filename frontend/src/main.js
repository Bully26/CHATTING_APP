import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store/data.js'
import router from "./router/router.js"
import vue3GoogleLogin from 'vue3-google-login'



/// adding comment
loadFonts()
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(store)
app.use(vue3GoogleLogin,{
    clientId:"1097954895004-5f7arjhlurkjmh1k5pmco6k59d9ch93l.apps.googleusercontent.com",
    scope:'email',
    prompt:'consent'
});

app.mount('#app')
