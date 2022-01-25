import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Manage from "../views/Manage.vue";
import Song from "../views/Song.vue";
import store from "../store/index";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    alias: "/manage",
    path: "/manage-music",
    meta: {
      requiresAuth: true,
    },
    component: Manage,
  },
  // Redirect the user if the path is changed and user goes to old path
  // {
  //   path: "/manage",
  //   redirect: { name: "manage" },
  // },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

// beforeEach is available after the instance of router is created.
// to paramenter is an object that carries an information where the user is navigating to
// from contains where the user is navigation from
router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
