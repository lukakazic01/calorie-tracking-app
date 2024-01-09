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
                    <tr class="border border-slate-400" v-for="todayCalories in data" :key="todayCalories.date">
                        <td>{{ todayCalories.date }}</td>
                        <td>{{ todayCalories.totalAmount }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import Loader from "@/components/Loader.vue";
import type {CaloriesByDayI} from "@/models/CaloriesByDay";
const userStore = useUserStore()

const {error, data, isLoading} = useQuery({
    queryFn: () => axios.get<CaloriesByDayI>('/caloriesByDay', {params: {email: userStore.username}}),
    queryKey: ['dailyIntakes', {user: userStore.username}],
    select: (data) => data.data.caloriesByDay
})
</script>

<style lang="scss" scoped>
</style>