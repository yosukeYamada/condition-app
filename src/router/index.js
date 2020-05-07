import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import DailyPost from "../views/DailyPost.vue";
import MyMotivation from "../views/MyMotivation";
import EmployeeMotivation from "../views/EmployeeMotivation";
import Aggregate from "../views/Aggregate";
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
    path: "/EmployeeMotivation/:userId?/employee",
    name: "EmployeeMotivation",
    component: EmployeeMotivation,
  },
  {
    path: "/MyMotivation",
    name: "MyMotivation",
    component: MyMotivation,
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
