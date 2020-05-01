import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import Posts from "../views/Posts.vue";
import MotivHistory from "../views/MotivHistory";
import Aggregate from "../views/Aggregate";
import DayOfMonthAggregate from "../views/DayOfMonthAggregate";
import EmployeeList from "../views/EmployeeList";
import AdminSetting from "../views/AdminSetting";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/RegisterUser",
    name: "RegisterUser",
    component: RegisterUser,
  },

  {
    path:"/Home",
    name:"Home",
    component:Home,

  },
  {
    path: "/Posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/MotivHistory",
    name: "MotivHistory",
    component: MotivHistory,
  },
  {
    path: "/Aggregate",
    name: "Aggregate",
    component: Aggregate,
  },
  {
    path:"/DayOfMonthAggregate",
    name: "DayOfMonthAggregate",
    component : DayOfMonthAggregate

  },
  {
    path: "/EmployeeList",
    name: "EmployeeList",
    component: EmployeeList,
  },
  {
    path: "/AdminSetting",
    name: "AdminSetting",
    component: AdminSetting,
  },
  

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
