import './assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import { VueQueryPlugin } from "@tanstack/vue-query";
import '@vuepic/vue-datepicker/dist/main.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
