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
import Top from "../views/Top.vue";
import store from "../store/index.js";

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
    //ログインしていたら上記のパスに飛ぶことを許可する
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/dailyPost",
    name: "DailyPost",
    component: DailyPost,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/EmployeeMotivation/:userId?/employee",
    name: "EmployeeMotivation",
    component: EmployeeMotivation,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/MyMotivation",
    name: "MyMotivation",
    component: MyMotivation,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/Aggregate",
    name: "Aggregate",
    component: Aggregate,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/EmployeeList",
    name: "EmployeeList",
    component: EmployeeList,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if ((store.getters.getStatus)) {
        next();
      }else{

        next("/");
      }

    },
  },
  {
    path: "/AdminSetting",
    name: "AdminSetting",
    component: AdminSetting,
    //ログインしていたら上記のパスに飛ぶことを許可する
    beforeEnter(to, from, next) {
      if (store.getters.getStatus === 1) {
        next();
      }else{

        next("/");
      }

    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
