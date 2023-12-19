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
          <FoodEntryTable :food-entries="foodEntries"/>
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
import type {IFoodEntry} from "@/models/FoodEntry";
import FoodEntryTable from "@/components/FoodEntryTable.vue";
const foodEntries = ref<IFoodEntry[]>([])
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

const addFoodEntry = (entry: IFoodEntry): void => {
    foodEntries.value.push(entry)
}
</script>

<style>
td {
    padding: 4px;
}
</style>
