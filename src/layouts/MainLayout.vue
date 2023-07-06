<script lang="ts" setup>
import Nav from "@/layouts/Nav.vue";
import Footer from "@/layouts/Footer.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Nav />
    <main
      class="mb-0 flex-grow-1 w-full h-full d-flex flex-col align-items-center"
    >
      <RouterView />
    </main>
  </div>
  <Footer />
</template>
