<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  const router = useRouter();
  console.log(router);
});

</script>

<style>
</style>
