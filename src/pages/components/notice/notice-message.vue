<template>
  <div>
    <Notification value="100232" :scale="scale"></Notification>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    {{ scale }}
    <button @click="scale = 1">click 1</button>
    <button @click="scale = 0.5">click 0.5</button>
    <button @click="scale = 1.5">click 1.5</button>
  </div>
</template>

<script setup lang="ts">
const scale = ref(0.5);
</script>

<style scoped></style>
