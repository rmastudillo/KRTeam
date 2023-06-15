
<script lang="ts" setup>
import { useTestStore } from "@/stores/testStore";
import { ref } from "vue";
import { Modal, Toast } from "bootstrap";
import { onMounted, onUnmounted, reactive } from "vue";

const testStore = useTestStore();
const modifica = () => {
  console.log(1);
  testStore.setTest("Modifiqué el teststore usando el método Test");
  console.log(testStore.getTest);
};

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
const modal = ref();
const toast = ref();
const infoModal = ref();
const bsToast = ref();

onMounted(() => {
  modal.value = new Modal(infoModal.value);
  toast.value = new Toast(bsToast.value);
});

onUnmounted(() => {
  modal.value = "";
  toast.value = "";
});
const variableee = ref("");
</script>






<template>
<nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>







<style>
.image-container {
  width: full; /* Ancho fijo del contenedor */
  min-height: fit-content; /* Alto fijo del contenedor */
  overflow: scroll; /* Oculta el contenido que exceda el tamaño del contenedor */
}

</style>
