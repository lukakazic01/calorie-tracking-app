<template>
    <div v-if="props.openModal" class="absolute bg-black/[0.3] inset-0 flex justify-center items-center">
      <div class="bg-white w-96 flex justify-center flex-col">
          <div class="p-4 flex justify-between border-b">
              <p class="text-xl font-bold">My food entry:</p>
              <button @click="closeModal" class="text-xl bold">x</button>
          </div>
          <div class="px-4 pb-4">
            <div class="flex flex-col mb-4 mt-2">
              <label class="mb-2">Name:</label>
              <input placeholder="Name" class="p-1 border" v-model="name">
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2">Time:</label>
              <input placeholder="Time" class="p-1 border" v-model="date">
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2">Calorie value:</label>
              <input placeholder="Calorie value"  class="p-1 border" type="number" v-model="calories">
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2">Price:</label>
              <input placeholder="Price" class="p-1 border" v-model="price">
            </div>
            <div class="flex justify-end">
              <button @click="closeModal" class="bg-red-500 text-white rounded p-2 mr-2">Close</button>
              <button @click="addFoodEntry" class="bg-green-600 rounded text-white p-2">Save</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {IFoodEntry} from "@/models/FoodEntry";

const props = defineProps<{
    openModal: boolean
}>()
const emit = defineEmits<{
    closeModal: [val: boolean]
    addFoodEntry: [val: IFoodEntry]
}>()
const name = ref<string>('');
const date = ref<string>('');
const calories = ref<number | null>(null);
const price = ref<number | null>(null);

const closeModal = (): void => {
    emit('closeModal', false)
}

const addFoodEntry = (): void => {
    emit('closeModal', false)
    const foodEntry = {
        name: name.value,
        date: date.value,
        price: price.value,
        calories: calories.value
    }
    emit('addFoodEntry', foodEntry)
}
</script>

<style scoped>
</style>