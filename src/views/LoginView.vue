<template>
    <div class="flex justify-center" v-if="isPending">
        <p><Loader /></p>
    </div>
    <div class="flex items-center flex-col" v-else>
        <h3 class="mt-2 text-xl">Login</h3>
        <p class="text-red-500" v-if="isError">Wrong email or password</p>
        <div class="w-72 mt-5">
            <form>
                <label>Email:</label>
                <input @input="reset" v-model="email" type="email" required class="w-full p-1 border outline-none mb-3" placeholder="Email" />
                <label>Password:</label>
                <input @input="reset" v-model="password" type="password" required class="w-full border p-1 outline-none" placeholder="Password"/>
                <button @click.prevent="login" class="bg-red-500 text-white p-1 w-full mt-5 rounded">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {useMutation} from "@tanstack/vue-query";
import type {UserI} from "@/server/interfaces/User";
import Loader from "@/components/Loader.vue";
import type {IResponse} from "@/models/Reponse";
import {useCookies} from "vue3-cookies";

const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();
const {cookies} = useCookies();

const {isPending, isError, reset, mutate} = useMutation({
    mutationFn: (user: UserI) => axios.post<IResponse>('http://localhost:3000/login', user, {withCredentials: true}),
    onSuccess: (d): void => {
        const {data} = d
        const token: string = cookies.get('token');
        userStore.setToken(token)
        userStore.setUsername(data.username);
        router.push('/')
    },
    onError: (err) => {
        console.log(err)
    }
})
const login = (): void => {
    if(!email.value || !password.value) return;
    mutate({email: email.value, password: password.value})
}
</script>

<style scoped>

</style>