import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Index.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
