<script lang="ts" setup>
import { getProducts } from "@/api/modules/default";
import { ref, onMounted } from "vue";

const products = ref([]);
const getProduct = async () => {
  const response = await getProducts();
  products.value = response;
};

onMounted(() => {
  getProduct();
});
</script>
<template>
  <div class="bg-gray-100 min-h-screen p-10">
    <router-link class="estasotraclase m-3 p-3" :to="{ name: 'Test' }">
      test
    </router-link>
  </div>
  {{ products }}
  <div class="home">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button>
  </div>
</template>
<style scoped>
.estasotraclase {
  border: 4px solid rgb(0, 0, 0);
  background-color: white;
  color: rgb(0, 0, 0);
  font-size: 16px;
  cursor: pointer;
}
</style>
