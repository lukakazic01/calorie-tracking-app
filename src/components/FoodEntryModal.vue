<template>
    <div v-if="props.openModal" class="absolute bg-black/[0.3] inset-0 flex justify-center items-center">
      <div class="bg-white w-96 flex justify-center flex-col">
          <div class="p-4 flex justify-between border-b">
                <p class="text-xl font-bold">My food entry:</p>
                <button @click="closeModal(); reset()" class="text-xl bold">x</button>
          </div>
          <div class="px-4 pb-4">
            <div class="flex flex-col mb-4 mt-2">
                <label class="mb-2">Name:</label>
                <input placeholder="Name" class="p-1 border" v-model="foodEntry.name">
                <p class="text-red-500 invisible"
                   :class="[error?.response?.data?.errors?.name ? '!visible' : '!invisible']">
                    Name is required
                </p>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2">Time:</label>
                <VueDatePicker v-model="foodEntry.date" placeholder="Time"/>
                <p class="text-red-500 invisible"
                   :class="[error?.response?.data?.errors?.date  ? '!visible' : '!invisible']">
                    Date is required
                </p>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2">Calorie value:</label>
                <input placeholder="Calorie value" min="1"  class="p-1 border" type="number" v-model="foodEntry.calories">
                <p class="text-red-500 invisible"
                   :class="[error?.response?.data?.errors?.calories  ? '!visible' : '!invisible']">
                    Calories are required
                </p>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2">Price:</label>
                <input placeholder="Price" type="number" min="1" class="p-1 border" v-model="foodEntry.price">
                <p class="text-red-500 invisible"
                   :class="[error?.response?.data?.errors?.price  ? '!visible' : '!invisible']">
                    Price is required
                </p>
            </div>
            <div class="flex justify-end">
                <button @click="closeModal(); reset()" class="bg-red-500 text-white rounded p-2 mr-2">Close</button>
                <button @click="addFoodEntry" class="bg-green-600 rounded text-white p-2">Save</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {IFoodEntry} from "@/models/FoodEntry";
import {useMutation} from "@tanstack/vue-query";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import type {IResponse} from "@/models/Reponse";
import type {IFood} from "@/server/interfaces/Food";

const props = defineProps<{
    openModal: boolean
}>()
const emit = defineEmits<{
    closeModal: [val: boolean]
    addFoodEntry: [val: IFoodEntry]
}>()
const foodEntry = ref<IFoodEntry>({name: '', date: new Date(), price: null, calories: null});
const userStore = useUserStore()
const {mutate, error, reset} = useMutation({
    mutationFn: (foodEntry: IFoodEntry & {email: string}) => axios.post<IFood & {status: string}>('/addFoodEntry', foodEntry),
    onError: (err) => {
      console.log(err)
    },
    onSuccess: (res) => {
        if (res) {
            const {data} = res
            emit('addFoodEntry', data);
            emit('closeModal', false)
        }
    }
})

const closeModal = (): void => {
    emit('closeModal', false)
}

const addFoodEntry = (): void => {
    mutate({...foodEntry.value, email: userStore.username})
}
</script>

<style scoped>
</style>