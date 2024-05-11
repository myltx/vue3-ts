import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Icons from '@ant-design/icons-vue'

import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
// import '@unocss/reset/tailwind.css'

import '~/styles/index.less'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

const iconNameList: string[] = []

for (const [key, component] of Object.entries(Icons)) {
  if (!['createFromIconfontCN', 'default', 'getTwoToneColor', 'setTwoToneColor'].includes(key)) {
    app.component(key, component)
    iconNameList.push(key)
  }
}
console.log(Icons, 'Icons')
app.use(createPinia())
app.use(router)

app.mount('#app')

export { iconNameList }
