
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
// import '@unocss/reset/tailwind.css'

import '~/styles/index.scss'

import 'element-plus/dist/index.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
