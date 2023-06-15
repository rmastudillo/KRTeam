<script lang="ts" setup>
import krteamlogo from "@/assets/img/krteamlogo.svg";
import { routes } from "@/router";
import { computed } from "vue";
import { useRouter } from "vue-router";

const siteUrl = import.meta.env.VITE_BUILD_ADDRESS;
const router = useRouter();
const activeRoute = computed(() => router.currentRoute.value.path);
const isActive = (path: string) => path === activeRoute.value;
</script>
<template>
  <div class="container">
    <nav class="navbar flex flex-row justify-between">
      <router-link
        :to="routes[0].path"
        class="navbar-brand d-flex align-items-center text-decoration-none"
      >
        <img :src="krteamlogo" alt="asdas" />
      </router-link>
      <div class="flex flex-row flex-nowrap gap-3">
        <div>Home</div>
        <div>Login</div>
        <div>Register</div>
        <div>Admin</div>
      </div>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
}
.search-block {
  background: #72caba;
  display: flex;
  height: 4rem;
  width: 100%;
  padding-inline: 5%;
  color: white;
  text-align: start;
  align-items: center;
}
</style>
