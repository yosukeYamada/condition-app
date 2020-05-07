import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import DailyPost from "../views/DailyPost.vue";
import MotivHistory from "../views/MotivHistory";
import Aggregate from "../views/Aggregate";
import EmployeeList from "../views/EmployeeList";
import AdminSetting from "../views/AdminSetting";
import Home from "../views/Home.vue";
import Top from "../views/Top.vue";

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
    path: "/top",
    name: "Top",
    component: Top,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/dailyPost",
    name: "DailyPost",
    component: DailyPost,
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
