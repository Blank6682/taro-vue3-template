<template>
  <div center>
    {{msg}}
  </div>
</template>

<script setup lang="ts">
const { msg } = defineProps<{
  msg: string
}>()

</script>

<style scoped>

</style>
