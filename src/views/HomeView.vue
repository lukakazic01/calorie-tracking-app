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
                      <FoodFilter @filter-change="handleFilterChange"/>
                  </div>
              </div>
          </div>
          <FoodEntryTable
              :food-entries="foodEntries"
              :is-loading="isLoading"
              :is-error="isError"
              @delete-entry="deleteEntry"
              @edit-entry="updateFoodEntry"/>
      </div>
      <FoodEntryModal
              v-if="isModalOpened"
              :entry-for-editing="foodEntry"
              @close-modal="closeModal"
              @add-food-entry="addFoodEntry"
              @edit-food-entry="editFoodEntry"
              @undo-editing="foodEntry = null"/>
  </main>
</template>

<script setup lang="ts">
import FoodEntryModal from "@/components/FoodEntryModal.vue";
import {ref} from "vue";
import type {IFoodEntry} from "@/models/FoodEntry";
import FoodEntryTable from "@/components/FoodEntryTable.vue";
import FoodFilter from "@/components/FoodFilter.vue";
import type {DateFilterResponse} from "@/models/DateFilterResponse";
const foodEntries = ref<IFoodEntry[]>([])
const foodEntry = ref<IFoodEntry | null>(null)
const isLoading = ref(true);
const isError = ref(false)
const isModalOpened = ref<boolean>(false);
const openModal = (): void => {
    isModalOpened.value = true;
}

const closeModal = (val: boolean): void => {
    isModalOpened.value = val;
}

const addFoodEntry = (entry: IFoodEntry): void => {
    foodEntries.value.push(entry)
}

const deleteEntry = (entry: IFoodEntry): void => {
    foodEntries.value = foodEntries.value.filter((item) => entry._id !== item._id)
}

const updateFoodEntry = (entry: IFoodEntry): void => {
    isModalOpened.value = true;
    foodEntry.value = entry;
}

const editFoodEntry = (entry: IFoodEntry): void => {
    foodEntries.value = foodEntries.value.map((item) => {
        if(item._id === entry._id) {
            return entry
        }
        return item;
    })
}

const handleFilterChange = (data: DateFilterResponse): void => {
    foodEntries.value = data.allFoodEntries
    isLoading.value = false
    isError.value = data.isError.value
}
</script>

<style>
td {
    padding: 4px;
}
</style>
