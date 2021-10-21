import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from "../views/Downloading.vue";
import New from "../views/NewTask.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Downloading",
    component: Downloading,
  },
  {
    path: "/completed",
    name: "Completed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "completed" */ "../views/Completed.vue"),
  },
  {
    path: "/new",
    component: New,
  },
  {
    path: "/task/:gid",
    name: "TaskDetail",
    component: () => import(/* webpackChunkName: "task" */ "../views/TaskDetail.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import(/* webpackChunkName: "setting" */ "../views/Setting.vue")
  },
];

const router = new VueRouter({
  routes,
});

export default router;
