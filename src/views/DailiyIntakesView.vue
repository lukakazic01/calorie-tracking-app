<template>
    <div class="flex justify-center">
        <template v-if="isLoading">
            <div class="flex justify-center">
                <Loader />
            </div>
        </template>
        <template v-else-if="error">
            <div class="flex justify-center">
                <p class="text-red-500">There was an error while fetching ur data</p>
            </div>
        </template>
        <table class="mt-5 w-9/12 border-collapse border border-slate-400" v-else>
            <thead class="bg-red-500 text-white text-left">
                <th>Date added</th>
                <th>Total calories</th>
            </thead>
            <tbody>
                <template v-if="data">
                    <tr class="border border-slate-400" v-for="(todayCalories, index) in data.data.caloriesByDay" :key="index">
                        <td>{{ todayCalories.date }}</td>
                        <td>{{ todayCalories.totalAmount }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import Loader from "@/components/Loader.vue";
const userStore = useUserStore()

const {error, data, isLoading} = useQuery({
    queryFn: () => axios.get('/caloriesByDay', {params: {email: userStore.username}}),
    queryKey: ['dailyIntakes', {user: userStore.username}]
})
</script>

<style lang="scss" scoped>
</style>