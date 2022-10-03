import App from './App'
import { createApp } from 'vue'
import module from './api/index.js'
createApp(App).mount('#app')
uni.$http = module
