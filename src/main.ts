import App from "@/App.vue";
import { router } from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import "@/assets/styles/tailwind.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useUserStore } from "./stores/userStore";

const app = createApp(App);

// USE PINIA
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

const userStore = useUserStore();
userStore.loadFromLocalStorage();
app.mount("#app");
