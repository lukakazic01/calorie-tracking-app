<template>
    <div class="flex justify-center mt-5" v-if="props.isLoading">
        <p><Loader /></p>
    </div>
    <div class="flex justify-center mt-5" v-else-if="props.isError">
        <p>There was an error while fetching ur data</p>
    </div>
    <table class="w-9/12 border mt-[40px]" v-else>
        <thead class="bg-red-500 text-white">
        <th class="p-2">Food name</th>
        <th>Calories</th>
        <th>Time</th>
        <th>Price</th>
        <th>Actions</th>
        </thead>
        <tbody>
        <template v-if="props.foodEntries.length">
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
        </template>
        </tbody>
    </table>
    <p v-if="!props.foodEntries.length" class="mt-3">There is no data for you. add some food entries :)</p>
</template>

<script setup lang="ts">
import type {IFoodEntry} from "@/models/FoodEntry";
import Loader from "@/components/Loader.vue";

const props = defineProps<{
    foodEntries: IFoodEntry[]
    isError: boolean,
    isLoading: boolean
}>()
</script>

<style scoped>

</style>