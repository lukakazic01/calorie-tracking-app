<template>
    <div class="flex items-center flex-col">
        <h3 class="mt-2 text-xl">Register</h3>
        <p class="text-red-500" v-if="existingUserError">User is already registered</p>
        <div class="w-72 mt-5">
            <form>
                <label>Email:</label>
                <input type="email" @input="removeErrors" required class="w-full p-1 border outline-none mb-3" v-model="email" placeholder="Email" />
                <p class="text-red-500" v-if="emailError">{{emailError}}</p>
                <label>Password:</label>
                <input @input="removeErrors" type="password" required class="w-full border p-1 outline-none" v-model="password" placeholder="Password"/>
                <p class="text-red-500" v-if="passwordError">{{passwordError}}</p>
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

const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const existingUserError = ref<boolean>(false);

const register = async (): Promise<void> => {
    try {
        await axios.post('http://localhost:3000/register', {
            email: email.value,
            password: password.value
        });
        await router.push('/login');
    } catch (err) {
        const {error}: ErrorRegisterI[] = err.response.data;
        if(error) {
            error.forEach((err) => {
                if(err.type === 'email') emailError.value = err.message;
                if(err.type === 'password') passwordError.value = err.message;
            })
        } else {
            existingUserError.value = true;
        }
    }
}

const removeErrors = () => {
    existingUserError.value = false;
    passwordError.value = null;
    emailError.value = null
}
</script>

<style scoped>

</style>