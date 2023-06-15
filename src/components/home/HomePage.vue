<script lang="ts" setup>
import { getProducts } from "@/api/modules/default";
import { onMounted, ref } from "vue";
import TitleSection from "./components/TitleSection.vue";

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
  <TitleSection />
</template>

<style>
.image-container {
  width: full; /* Ancho fijo del contenedor */
  min-height: fit-content; /* Alto fijo del contenedor */
  overflow: scroll; /* Oculta el contenido que exceda el tamaño del contenedor */
}
</style>
