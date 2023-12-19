<template>
  <main>
      <div class="flex items-center mt-5 flex-col">
          <div @click="openModal" class="w-9/12 flex justify-between rounded items-center shadow-[1px_1px_5px_2px_rgba(200,200,200,1)] p-2">
              <p class="text-xl">My food entries:</p>
              <button class="text-white p-2 bg-purple-400 rounded">+ New food enrtry</button>
          </div>
          <div class="mt-[50px] w-9/12 flex justify-between rounded items-center shadow-[1px_1px_5px_2px_rgba(200,200,200,1)] p-2">
              <p class="text-xl">Filter by dates:</p>
              <div class="flex">
                  <div class="flex items-center">
                      <p class="mr-2">Date:</p>
                      <VueDatePicker v-model="date" range/>
                  </div>
              </div>
          </div>
          <table class="w-9/12 border mt-[40px]">
              <thead class="bg-red-500 text-white">
                  <th class="p-2">Food name</th>
                  <th>Calories</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Actions</th>
              </thead>
              <tbody>
                   <tr class="border text-center" v-for="entry in foodEntries" :key="entry.id">
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
      </div>
      <FoodEntryModal
              :open-modal="isModalOpened"
              @close-modal="closeModal"
              @add-food-entry="addFoodEntry"
      />
      <button @click="z">a</button>
  </main>
</template>

<script setup lang="ts">
import FoodEntryModal from "@/components/FoodEntryModal.vue";
import {ref, watch} from "vue";
import axios from "axios";
const foodEntries = ref([{id: 1, name: 'Pizza', calories: 400, date: '19/12/2023 21:20', price: 24}])
const date = ref<string>('');
const isModalOpened = ref<boolean>(false);
const openModal = (): void => {
    isModalOpened.value = true;
}

const closeModal = (val: boolean): void => {
    isModalOpened.value = val;
}
const z = () => {
    axios.get('/getFood',)
}

const addFoodEntry = (entry): void => {
    foodEntries.value.push(entry)
}

watch(date, (newDate) => console.log(newDate));

</script>

<style>
td {
    padding: 4px;
}
</style>
