<template>
    <table class="w-9/12 border mt-[40px]">
        <thead class="bg-red-500 text-white">
        <th class="p-2">Food name</th>
        <th>Calories</th>
        <th>Time</th>
        <th>Price</th>
        <th>Actions</th>
        </thead>
        <tbody>
        <tr class="border text-center" v-for="(entry, index) in props.foodEntries" :key="index">
            <td>{{ entry.name }}</td>
            <td>{{ entry.calories }}</td>
            <td>{{ entry.date }}</td>
            <td>{{ entry.price }}$</td>
            <td>
                <button class="rounded mr-3 p-2 bg-red-500 text-white">delete</button>
                <button class="bg-yellow-400 rounded p-2">edit</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type {IFoodEntry} from "@/models/FoodEntry";

const props = defineProps<{
    foodEntries: IFoodEntry[]
}>()
</script>

<style lang="scss" scoped>

</style>