<template>
    <div>
        <VueDatePicker @update:model-value="handleDate" v-model="date" range/>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useDateFormatter} from "@/composables/dateFormatter";

const date = ref<[Date, Date | null]>();
const router = useRouter();
const route = useRoute();
if(route.query.date) {
    const [startDate, endDate]: [string, string | null] = route.query.date.split('-');
    const modifiedStartDate = startDate.replaceAll('/', '-');
    if(!endDate) {
        date.value = [new Date(modifiedStartDate), null]
    } else {
        const modifiedEndDate = endDate.replaceAll('/', '-');
        date.value = [new Date(modifiedStartDate), new Date(modifiedEndDate)]
    }
}
const handleDate = (val: [Date, Date | null] | null): void => {
    if(!val) {
        router.push({path: '', query: {}})
        return;
    }
    const [startDate, endDate] = val
    if(endDate) {
        router.push({path: '', query: {date: `${useDateFormatter(startDate)}-${useDateFormatter(endDate)}`}})
    } else {
        router.push({path: '', query: {date: `${useDateFormatter(startDate)}`}})
    }
}
</script>

<style scoped>

</style>