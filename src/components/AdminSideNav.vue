<template>
  <div id="adminside">
    <div class="sideMenu">
      <b-sidebar id="sidebar-1" title="Menu" shadow>
        <!-- <Menubotton id="Menubutton1"></Menubotton> -->
        <AdminSideNav class="sideNav">
          <router-link to="/Posts">
            <p>今日のコンディション投稿</p>
          </router-link>
          <router-link to="/MotivHistory">
            <p>モチベーション履歴</p>
          </router-link>
          <router-link to="/Aggregate">
            <p>集計グラフ</p>
          </router-link>
          <router-link to="/EmployeeList">
            <p>従業員一覧</p>
          </router-link>
          <router-link to="AdminSetting">
            <p>管理者設定</p>
          </router-link>
        </AdminSideNav>
        <Logout/>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import AdminSideNav from "../components/AdminSideNav.vue";
import Logout from "@/components/Logout"
// import Menubotton from "../components/Menubotton.vue";
export default {
  components: {
    AdminSideNav,
    Logout
    // Menubotton,
  },
};
</script>

<style>
#sidebar-1 {
  background: aquamarine;
}
.sideMenu {
  background: aquamarine;
}
.sideNav {
  background: aquamarine;
}
</style>
