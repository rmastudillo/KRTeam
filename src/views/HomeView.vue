<script setup lang="ts">
import HomePage from "@/components/home/HomePage.vue";
</script>

<template>
  <router-view :key="$route.path">
    <HomePage />
  </router-view>
</template>
