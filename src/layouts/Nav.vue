<script lang="ts" setup>
import krteamlogo from "@/assets/img/krteamlogo.svg";
import { routes } from "@/router";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const siteUrl = import.meta.env.VITE_BUILD_ADDRESS;
const router = useRouter();
const activeRoute = computed(() => router.currentRoute.value.path);
const isActive = (path: string) => path === activeRoute.value;
const userStore = storeToRefs(useUserStore());
const userIsLogged = userStore.isLogged;
const userIsAppAdmin = userStore.isAppAdmin;
const userIsAdminRestobar = userStore.isRestobarAdmin;

const logoutAndRedirect = () => {
  useUserStore().logout();
  router.push({ name: "Home" });
};
</script>
<template>
  <nav class="navbar flex flex-row justify-between">
    <div class="container">
      <router-link
        :to="{ name: 'Home' }"
        class="navbar-brand d-flex align-items-center text-decoration-none"
      >
        <img :src="krteamlogo" alt="logo" />
      </router-link>
      <div class="flex flex-row flex-nowrap gap-4">
        <router-link :to="{ name: 'Home' }">
          <span class="link">Home</span>
        </router-link>
        <router-link :to="{ name: 'Local' }">
          <span class="link">Ver locales</span>
        </router-link>
        <!-- Mostrar solo si el usuario está logeado -->
        <div v-if="userIsLogged" class="flex flex-row flex-nowrap gap-4">
          <div v-if="!userIsAdminRestobar">
            <router-link :to="{ name: 'UserProfile' }">
              <span class="link">Perfil</span>
            </router-link>
          </div>
          <div v-else>
            <router-link :to="{ name: 'AdminRestobar' }">
              <span class="link">Ver reservas</span>
            </router-link>
          </div>
          <div v-if="userIsAppAdmin">
            <router-link :to="{ name: 'Admin' }">
              <span class="link">Admin</span>
            </router-link>
          </div>
          <div class="link" @click="logoutAndRedirect">
            Logout
          </div>
        </div>
        <template v-else>
          <!-- Mostrar solo si el usuario NO está logeado -->
          <router-link :to="{ name: 'Login' }">
            <div class="link">Login</div>
          </router-link>
          <router-link :to="{ name: 'Register' }">
            <div class="link">Register</div>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
}

nav {
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
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
  gap: 10px;
}

.link {
  color: #000;
  text-decoration: none;
  font-size: 20px;
  font-family: Helvetica, sans-serif;
}
.link:hover {
  color: #0074d9;
  text-decoration: none;
  cursor: pointer;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}
</style>
