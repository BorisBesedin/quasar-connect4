const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "IndexPage",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "game.sp",
        name: "GameSpPage",
        component: () => import("pages/GameSpPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
