<script lang="ts" setup>
import Nav from "@/layouts/Nav.vue";
import Footer from "@/layouts/Footer.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <Nav />
  <main class="container flex-shrink-0 mb-4">
    <RouterView/>
  </main>
  <footer class="container footer mb-2 mt-auto">
    <Footer />
  </footer>
</template>