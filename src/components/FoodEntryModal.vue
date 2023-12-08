<template>
    <div v-if="props.openModal">
      modal
      <button @click="closeModal">Close modal</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    openModal: boolean
}>()
const emit = defineEmits<{
    closeModal: [val: boolean]
}>()

const closeModal = () => {
  emit('closeModal', false)
}
</script>

<style scoped>
</style>