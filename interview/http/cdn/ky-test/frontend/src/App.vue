<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// CORS policy
// Cross-Origin Resource Sharing policy

async function fetchUser() {
  //前端知道访问的地址和域名
  // 
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
