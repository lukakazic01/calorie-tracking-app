<template>
    <div class="flex justify-center" v-if="isPending">
        <p><Loader /></p>
    </div>
    <div class="flex items-center flex-col" v-else>
        <h3 class="mt-2 text-xl">Register</h3>
        <p class="text-red-500" v-if="isError && existingUserError">User is already registered</p>
        <div class="w-72 mt-5">
            <form>
                <label>Email:</label>
                <input type="email" @input="reset" required class="w-full p-1 border outline-none mb-3" v-model="email" placeholder="Email" />
                <p class="text-red-500" v-if="isError && emailError">{{ emailError  }}</p>
                <label>Password:</label>
                <input @input="reset" type="password" required class="w-full border p-1 outline-none" v-model="password" placeholder="Password"/>
                <p class="text-red-500" v-if="isError && passwordError">{{ passwordError }}</p>
                <button @click.prevent="register()" class="bg-red-500 text-white p-1 w-full mt-5 rounded">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {ErrorRegisterI} from "@/models/ErrorRegisterI";
import {useMutation} from "@tanstack/vue-query";
import type {UserI} from "@/server/interfaces/User";
import Loader from "@/components/Loader.vue";
import type {IResponse} from "@/models/Reponse";

const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null)
const existingUserError = ref<boolean>(false)
const { isPending ,mutate, isError, reset } = useMutation({
    mutationFn: (newUser: UserI) => axios.post<IResponse>('/register', newUser),
    onError: (err) => {
        const {error}: ErrorRegisterI[] = err.response.data;
         if(error) {
             error.forEach((e) => {
                if(e.type === 'email') emailError.value = e.message;
                if(e.type === 'password') passwordError.value = e.message;
            })
        } else {
            existingUserError.value = true;
        }
    },
    onSuccess: () => router.push('/login')
})

const register = (): void => {
    mutate({email: email.value, password: password.value})
}
</script>

<style scoped>

</style>