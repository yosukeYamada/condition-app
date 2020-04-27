import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import EmployeeHome from "../views/EmployeeHome.vue";
import AdminHome from "../views/AdminHome.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/registerUser",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/EmployeeHome",
    name: "EmployeeHome",
    component: EmployeeHome,
  },
  {
    path: "/AdminHome",
    name: "AdminHome",
    component: AdminHome,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
