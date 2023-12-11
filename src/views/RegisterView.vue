<template>
    <div class="flex items-center flex-col">
        <h3 class="mt-2 text-xl">Register</h3>
        <div class="w-72 mt-5">
            <label>Email:</label>
            <input class="w-full p-1 border outline-none mb-3" v-model="email" placeholder="Email" />
            <label>Password:</label>
            <input class="w-full border p-1 outline-none" v-model="password" placeholder="Password"/>
            <button @click="register()" class="bg-red-500 text-white p-1 w-full mt-5 rounded">Submit</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";

const email = ref<string>('');
const password = ref<string>('');

const register = async () => {
    try {
        const {data} = await axios.post('http://localhost:3000/register', {
            email: email.value,
            password: password.value
        });
        console.log(data)
    } catch (err) {
        //
    }
}
</script>

<style scoped>

</style>