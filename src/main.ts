import './assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import { VueQueryPlugin } from "@tanstack/vue-query";
import '@vuepic/vue-datepicker/dist/main.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies, {useCookies} from 'vue3-cookies'
import axios from 'axios';
import {useUserStore} from "@/stores/user";
import { jwtDecode } from "jwt-decode";
import type {IResponse} from "@/models/Reponse";
import type {IJwtPayload} from "@/models/JwtPayload";
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(createPinia())
app.use(VueCookies);
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')

const userStore = useUserStore();
const {cookies} = useCookies();
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.interceptors.request.use(
    (config) => {
        const token: string = cookies.get('token')
        if(token) {
            config.headers['Authorization'] = token
        }
        return config
    }
)

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if(error.response.data.message === 'Invalid token') {
            userStore.$reset()
            cookies.remove('token')
            router.push('/login').then()
        }
        return Promise.reject(error);
    }
)

router.beforeEach( async (to, from): Promise<any> => {
    if(to.name !== 'login' && to.name !== 'register') {
        try {
            const token: string = cookies.get('token')
            const {data: authData} = await axios.post<IResponse>('/verifyToken', {token})
            if(authData.token) {
                const {data} = jwtDecode<IJwtPayload>(authData.token)
                userStore.setUsername(data.name);
                userStore.setRole(data.role)
            }
            return true;
        } catch(err) {
            userStore.$reset()
            cookies.remove('token')
            return router.push('/login')
        }

    } else return true;

})
