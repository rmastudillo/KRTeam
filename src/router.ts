import { createRouter, createWebHistory } from "vue-router";
import { testRoute } from "./components/first_page/router";
import { homeRoute } from "./components/home/router";
import { localRoute } from "./components/local_page/router";
import { loginRoute } from "./components/login/router";

export const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [...homeRoute, ...testRoute, ...localRoute, ...loginRoute],
  },
];

export const router = createRouter({
  history: createWebHistory(`${import.meta.env.BASE_URL}`),
  routes: routes,
});
