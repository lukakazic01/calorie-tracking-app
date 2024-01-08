<template>
    <nav class="text-center bg-red-500 flex justify-between items-center">
        <ul class="flex text-white items-center">
            <li class="p-3"><RouterLink to="/">Home</RouterLink></li>
            <li class="p-3"><RouterLink to="/register">Register</RouterLink></li>
            <li class="p-3"><RouterLink to="/login">Login</RouterLink></li>
            <li class="p-3"><RouterLink to="/intakes">Daily intakes</RouterLink></li>
            <HasPermission :role="userStore.role" v-if="userStore.role">
                <template #adminUser>
                    <li class="p-3"><RouterLink to="/admin/report">Report</RouterLink></li>
                </template>
                <template #ordinaryUser />
            </HasPermission>
        </ul>
        <p v-if="userStore.username" class="text-white pr-3">{{userStore.username}}</p>
    </nav>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import HasPermission from "@/components/HasPermission.vue";
const userStore = useUserStore()
</script>

<style scoped>

</style>