import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
// import '@unocss/reset/tailwind.css'

import '~/styles/index.scss'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)

const iconNameList: string[] = []

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
  iconNameList.push(key)
}
app.use(createPinia())
app.use(router)

app.mount('#app')

export { iconNameList }
