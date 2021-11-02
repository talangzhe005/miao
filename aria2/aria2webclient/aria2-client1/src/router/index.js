import Vue from 'vue'
import VueRouter from 'vue-router'
import Downloading from "../views/Downloading.vue";
import New from "../views/NewTask.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Downloading",
    component: Downloading,
  },
  {
    path: "/new",
    component: New,
  },
  {
    path: "/completed",
    name: "Completed",
    component: () =>
      import(/* webpackChunkName: "completed" */ "../views/Completed.vue"),
  },
  {
    path: "/servers",
    name: "Servers",
    component: () => import(/* webpackChunkName: "servers" */ "../views/Servers.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import(/* webpackChunkName: "setting" */ "../views/Setting.vue")
  },
  {
    path: "/task/:gid",
    name: "TaskDetail",
    component: () => import(/* webpackChunkName: "task" */ "../views/TaskDetail.vue")
  },
]

const router = new VueRouter({
  routes
})

export default router
