<template>
    <div class="flex justify-center mt-5">
        <div class="basis-1/3 mr-5 rounded overflow-hidden border">
            <p class="text-white p-2 bg-red-500">Food entries in last 7 days</p>
            <div class="flex justify-center">
                <p class="font-bold text-4xl p-12">{{ weeklyFoodEntries?.allDatesBeforeSevenDays }}</p>
            </div>
        </div>
        <div class="basis-1/3 rounded overflow-hidden border">
            <p class="text-white p-2 bg-red-500">Food entries in last 7 to 14 days</p>
            <div class="justify-center flex">
                <p class="font-bold text-4xl p-12">{{ weeklyFoodEntries?.allDatesBeforeTwoWeeks }}</p>
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-5">
        <div class="basis-[68.5%]">
            <table class="w-full text-left border-collapse border">
                <thead class="bg-red-500 text-white">
                    <tr>
                        <th class="w-6/12">User</th>
                        <th class="w-6/12">Average calories</th>
                    </tr>
                </thead>
                <tbody v-if="avgCalories">
                    <tr class="border" v-for="user in avgCalories.averageCaloriesInLastSevenDays" :key="user.id">
                        <td>{{ user.email }}</td>
                        <td>{{ user.avgCalories }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import type {WeeklyFoodEntriesI} from "@/models/WeeklyFoodEntries";
import type {AverageCaloriesLastSevenDaysI} from "@/models/AverageCaloriesLastSevenDays";
const fetchAverageCalories = async (): Promise<AverageCaloriesLastSevenDaysI> => {
    const res = await axios.get('/averageCalories')
    return res.data
}
const fetchWeeklyFoodEntries = async (): Promise<WeeklyFoodEntriesI> => {
    const res = await axios.get('/weeklyFood');
    return res.data
}
const {data: weeklyFoodEntries} = useQuery({ queryFn: fetchWeeklyFoodEntries, queryKey: ['weeklyFood'] })
const {data: avgCalories} = useQuery({ queryFn: fetchAverageCalories, queryKey: ['averageCalories'] })
</script>

<style scoped>

</style>