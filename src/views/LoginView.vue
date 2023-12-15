<template>
    <div class="flex items-center flex-col">
        <h3 class="mt-2 text-xl">Login</h3>
        <p class="text-red-500" v-if="error">Wrong email or password</p>
        <div class="w-72 mt-5">
            <form>
                <label>Email:</label>
                <input @input="removeError" v-model="email" type="email" required class="w-full p-1 border outline-none mb-3" placeholder="Email" />
                <label>Password:</label>
                <input @input="removeError" v-model="password" type="password" required class="w-full border p-1 outline-none" placeholder="Password"/>
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

const email = ref('');
const password = ref('');
const router = useRouter();
const error = ref<boolean>(false);
const userStore = useUserStore()
const login = async (): Promise<void> => {
    if(!email.value || !password.value) return;
    try {
        const {data} = await axios.post("http://localhost:3000/login", {
            email: email.value,
            password: password.value
        }, {withCredentials: true})
        userStore.setUsername(data.username);
        await router.push({path: '/'});
    } catch(err) {
        error.value = true;
    }
}

const removeError = () => {
    error.value = false;
}
</script>

<style scoped>

</style>