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
          <FoodEntryTable :food-entries="foodEntries" :is-loading="isLoading" :is-error="isError" @delete-entry="deleteEntry"/>
      </div>
      <FoodEntryModal
              :open-modal="isModalOpened"
              @close-modal="closeModal"
              @add-food-entry="addFoodEntry"

      />
  </main>
</template>

<script setup lang="ts">
import FoodEntryModal from "@/components/FoodEntryModal.vue";
import {ref} from "vue";
import axios from "axios";
import type {IFoodEntry} from "@/models/FoodEntry";
import FoodEntryTable from "@/components/FoodEntryTable.vue";
import {useQuery} from "@tanstack/vue-query";
import {useUserStore} from "@/stores/user";
import type {AllFoodEntriesI} from "@/models/allFoodEntries";
const foodEntries = ref<IFoodEntry[]>([])
const date = ref<string>('');
const isModalOpened = ref<boolean>(false);
const userStore = useUserStore()
const getAlLFoodEntries = () => axios.get<AllFoodEntriesI[]>('/getFoodEntries', {params: {email: userStore.username}});

const {isLoading ,isError} = useQuery({
    queryKey: ['food', userStore.username],
    queryFn: async () => {
        const {data} = await getAlLFoodEntries()
        foodEntries.value = data.allFoodEntries;
        return data;
    },
})

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
</script>

<style>
td {
    padding: 4px;
}
</style>
