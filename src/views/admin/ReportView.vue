<template>
    <div class="flex justify-center mt-5">
        <div class="basis-1/3 mr-5 rounded overflow-hidden border">
            <p class="text-white p-2 bg-red-500">Food entries in last 7 days</p>
            <div class="flex justify-center">
                <p class="font-bold text-4xl p-12">{{ weeklyFoodEntries?.data?.allDatesBeforeSevenDays }}</p>
            </div>
        </div>
        <div class="basis-1/3 rounded overflow-hidden border">
            <p class="text-white p-2 bg-red-500">Food entries in last 7 to 14 days</p>
            <div class="justify-center flex">
                <p class="font-bold text-4xl p-12">{{ weeklyFoodEntries?.data?.allDatesBeforeTwoWeeks }}</p>
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
                <tbody>
                    <tr class="border" v-for="user in avgCalories?.data?.averageCaloriesInLastSevenDays" :key="user._id">
                        <td>{{user.email}}</td>
                        <td>{{ user.avgCalories }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";

const {data: weeklyFoodEntries} = useQuery({
    queryFn: () => axios.get('/weeklyFood'),
    queryKey: ['weeklyFood'],
})
const {data: avgCalories} = useQuery({
    queryFn: () => axios.get('/averageCalories'),
    queryKey: ['averageCalories'],
})
</script>

<style scoped>

</style>