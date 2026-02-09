import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { IonicVue } from '@ionic/vue'

/* Ionic CSS */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Eigen CSS */
import './assets/main.css'
import './theme/variables.css'


const app = createApp(App)

/* Eerst IonicVue gebruiken */
app.use(IonicVue)

/* Dan Vuex store */
app.use(store)

/* Dan router */
app.use(router)

/* Pas mounten nadat router klaar is */
router.isReady().then(() => {
  app.mount('#app')
})
