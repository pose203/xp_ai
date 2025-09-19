<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

async function fetchUser() {
  const res = await fetch('/api/user');
  const data = await res.json();
  console.log(data);
}

fetchUser();
</script>

<template>
  <div>
  </div>
    <HelloWorld msg="Vite + Vue" />

  
  
</template>

<style scoped>

</style>
