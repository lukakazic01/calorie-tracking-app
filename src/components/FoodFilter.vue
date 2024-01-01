<template>
    <div>
        <VueDatePicker @update:model-value="handleDateChange" v-model="date" range/>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {LocationQueryValue, useRoute, useRouter} from "vue-router";
import {useDateFormatter} from "@/composables/dateFormatter";
import axios from "axios";
import {useQuery} from "@tanstack/vue-query";
import {useUserStore} from "@/stores/user";
import {AllFoodEntriesI} from "@/models/allFoodEntries";
import type {DateFilterResponse} from "@/models/DateFilterResponse";

const date = ref<[Date, Date | null]>([]);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore()
const emit = defineEmits<{
    filterChange: [val: DateFilterResponse]
}>()

if(route.query.date) {
    const dateQueryParam: string | LocationQueryValue[] = route.query.date;
    if(typeof dateQueryParam === 'string') {
        const [startDate, endDate]= dateQueryParam.split('-');
        const modifiedStartDate: string = startDate.replaceAll('/', '-');
        const modifiedEndDate: string | null = endDate?.replaceAll('/', '-') || null;
        date.value = [
            new Date(modifiedStartDate),
            (modifiedEndDate ? new Date(modifiedEndDate) : null)
        ]
    }
}

const {error, isError, refetch} = useQuery({
    queryFn: async () => {
        const [startDate, endDate] = date.value
        const email: string = userStore.username
        try {
            const {data} = await axios.get<AllFoodEntriesI[]>('/getFoodEntries', {params: {startDate, endDate, email}})
            emit('filterChange', {allFoodEntries: data.allFoodEntries, isError})
            return data;
        } catch (err) {
            emit('filterChange', {allFoodEntries: [], isError})
        }
    },
    queryKey: ['filterByDate', date.value],

})
const handleDateChange = async (val: [Date, Date | null] | null): Promise<void> => {
    if(!val) {
        await router.push({path: '', query: {}})
        date.value = [];
        refetch()
        return;
    }
    const [startDate, endDate]: [Date, Date] = val
    if(endDate) {
        await router.push({path: '', query: {date: `${useDateFormatter(startDate)}-${useDateFormatter(endDate)}`}})
    } else {
        await router.push({path: '', query: {date: `${useDateFormatter(startDate)}`}})
    }
    refetch()
}

</script>

<style scoped>

</style>