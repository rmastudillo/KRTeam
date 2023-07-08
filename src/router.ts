import { createRouter, createWebHistory } from "vue-router";
import { testRoute } from "./components/first_page/router";
import { homeRoute } from "./components/home/router";
import { localRoute } from "./components/local_page/router";
import { loginRoute } from "./components/login/router";
import { registerRoute } from "./components/register/router";
import { userProfileRoute } from "./components/user_profile/router";
import { adminRoute } from "./components/admin_page/router";
import { RestobarAdminRoute } from "./components/restobar_admin_page/router";
import { reservaRoute } from "./components/reserva_page/router";
import { useUserStore } from "./stores/userStore";

export const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      ...homeRoute,
      ...loginRoute,
      ...testRoute,
      ...localRoute,
      ...userProfileRoute,
      ...adminRoute,
      ...RestobarAdminRoute,
      ...registerRoute,
      ...reservaRoute,
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(`${import.meta.env.BASE_URL}`),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userStore = useUserStore();
    if (!userStore.isLogged) {
      next({ name: "Home" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});
