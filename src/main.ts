import './assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import { VueQueryPlugin } from "@tanstack/vue-query";
import '@vuepic/vue-datepicker/dist/main.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'
import axios from 'axios';
import {useUserStore} from "@/stores/user";
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(createPinia())
app.use(VueCookies);
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')

const userStore = useUserStore();
axios.interceptors.request.use(
    (config) => {
        const token = userStore.token;
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
