// vue3 main.js
import {createSSRApp} from "vue";
import App from "./App.vue";
import module from './api/index.js'
import {setupRouter} from './router/index.js'
import store from './store/index.js'

export function createApp() {
    const app = createSSRApp(App);
		app.use(store)
		setupRouter(app)
    return {
        app,
    };
}
uni.$http = module
