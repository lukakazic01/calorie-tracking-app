<template>
    <div class="flex justify-center">
        <table class="mt-5 w-9/12 border-collapse border border-slate-400">
            <thead class="bg-red-500 text-white text-left">
                <th>Date added</th>
                <th>Total calories</th>
            </thead>
            <tbody>
                <tr class="border border-slate-400">
                    <td>05/01/2024</td>
                    <td>2000 calories</td>
                </tr>
                <tr>
                    <td>05/01/2024</td>
                    <td>2000 calories</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import {useUserStore} from "@/stores/user";
const userStore = useUserStore()

const {error, success, isError} = useQuery({
    queryFn: () => axios.get('/caloriesByDay', {params: {email: userStore.username}}),
    queryKey: ['dailyIntakes', {user: userStore.username}]
})
</script>

<style lang="scss" scoped>
</style>