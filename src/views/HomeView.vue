<template>
  <main>
      <div class="flex justify-center mt-5">
          <div @click="openModal" class="w-9/12 flex justify-between shadow-[1px_1px_5px_2px_rgba(200,200,200,1)] p-2">
              <p class="text-xl">My food entries:</p>
              <button class="text-white p-1 bg-purple-400 rounded">+ New food enrtry</button>
          </div>
      </div>
      <FoodEntryModal
              :open-modal="isModalOpened"
              @close-modal="closeModal"
      />
  </main>
</template>

<script setup lang="ts">
import FoodEntryModal from "@/components/FoodEntryModal.vue";
import {ref} from "vue";

const isModalOpened = ref<boolean>(false);
const openModal = (): void => {
    isModalOpened.value = true;
}

const closeModal = (val): void => {
    isModalOpened.value = val;
}

</script>

<style>

</style>
