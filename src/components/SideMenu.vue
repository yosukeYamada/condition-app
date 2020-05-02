<template>
  <div id="adminside">
    <div class="sideMenu">
      <b-sidebar id="sidebar-1" title="Menu" shadow>
        <router-link to="/Posts">
          <p>今日のコンディション投稿</p>
        </router-link>
        <router-link to="/MotivHistory">
          <p>モチベーション履歴</p>
        </router-link>
        <!-- {{authority}} -->
        <router-link to="/Aggregate" v-show="authority == 1">
          <p>集計グラフ</p>
        </router-link>
        <router-link to="/EmployeeList" v-show="authority == 1">
          <p>従業員一覧</p>
        </router-link>
        <router-link to="AdminSetting" v-show="authority == 1">
          <p>管理者設定</p>
        </router-link>
        <Logout />
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import Logout from "@/components/Logout";
// import Menubotton from "../components/Menubotton.vue";
export default {
  components: {
    Logout,
    // Menubotton,
  },
  computed: {
    authority: function() {
      return this.$store.state.authority;
    },
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
