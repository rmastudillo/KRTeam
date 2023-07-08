export const userProfileRoute = [
    {
      path: "/profile",
      name: "UserProfile",
      component: () => import("@/views/UserProfileView.vue"),
      meta: { requiresAuth: true },
    },
  ];
  