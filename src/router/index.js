import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import EmployeeHome from "../views/EmployeeHome.vue";
import AdminHome from "../views/AdminHome.vue";
import Posts from "../views/Posts.vue";
import MotivHistory from "../views/MotivHistory";
import Aggregate from "../views/Aggregate";
import EmployeeList from "../views/EmployeeList";
import EmployeeDetail from "../views/EmployeeDetail";

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
  {
    path: "/Posts",
    name: "Posts",
    component : Posts,

  },
  {
    path: "/MotivHistory",
    name: "MotivHistory",
    component : MotivHistory, 
  },
  {
    path: "/Aggregate",
    name: "Aggregate",
    component :Aggregate,
  },
  {
    path: "/EmployeeList",
    name: "EmployeeList",
    component : EmployeeList,
  },
  {
    path: "/EmployeeDetail",
    name: "EmployeeDetail",
    component : EmployeeDetail,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
