import { createApp } from 'vue'
import App from './App.vue'

// Ionic
import { IonicVue } from '@ionic/vue'
import router from './router'

// Ionic CSS
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

// CSS
import './theme/variables.css'

const app = createApp(App)
app.use(IonicVue)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
