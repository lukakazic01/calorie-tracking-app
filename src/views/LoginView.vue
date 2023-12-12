<template>
    <div class="flex items-center flex-col">
        <h3 class="mt-2 text-xl">Login</h3>
        <div class="w-72 mt-5">
            <form>
                <label>Email:</label>
                <input v-model="email" type="email" required class="w-full p-1 border outline-none mb-3" placeholder="Email" />
                <label>Password:</label>
                <input v-model="password" type="password" required class="w-full border p-1 outline-none" placeholder="Password"/>
                <button @click="login" class="bg-red-500 text-white p-1 w-full mt-5 rounded">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const email = ref('');
const password = ref('');
const router = useRouter();
const login = async (): Promise<void> => {
    if(!email.value || !password.value) return;
    try {
        const {data} = await axios.post("http://localhost:3000/login", {
            email: email.value,
            password: password.value
        })
        await router.push({path: '/'});
    } catch(err) {
        //
    }
}
</script>

<style scoped>

</style>