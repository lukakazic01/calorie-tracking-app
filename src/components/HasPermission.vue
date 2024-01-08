<template>
    <div>
        <slot name="ordinaryUser" v-if="props.role !== 'admin'"></slot>
        <slot name="adminUser" v-else></slot>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    role: string
}>()
</script>

<style scoped>

</style>