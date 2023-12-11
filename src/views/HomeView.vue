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
                   <tr class="border text-center">
                       <td>Pizza</td>
                       <td>400</td>
                       <td>asdasd</td>
                       <td>24$</td>
                       <td>
                           <button class="rounded mr-3 p-2 bg-red-500 text-white">trash</button>
                           <button class="bg-yellow-400 rounded p-2">edit</button>
                       </td>
                   </tr>
              </tbody>
          </table>
      </div>
      <FoodEntryModal
              :open-modal="isModalOpened"
              @close-modal="closeModal"
      />
  </main>
</template>

<script setup lang="ts">
import FoodEntryModal from "@/components/FoodEntryModal.vue";
import {ref, watch} from "vue";
const date = ref<string>('');
const isModalOpened = ref<boolean>(false);
const openModal = (): void => {
    isModalOpened.value = true;
}

const closeModal = (val: boolean): void => {
    isModalOpened.value = val;
}

watch(date, (newDate) => console.log(newDate));

</script>

<style>
td {
    padding: 4px;
}
</style>
