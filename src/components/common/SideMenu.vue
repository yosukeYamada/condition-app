<template>
  <div id="adminside" v-if="$store.state.login_user">
    <div class="sideMenu">
      <b-sidebar
        id="sidebar-backdrop"
        bg-variant="dark"
        text-variant="light"
        backdrop
        shadow
      >
        <div class="px-4 mt-5 mb-5 display-1 font-weight-medium">Menu</div>
        <v-list class="py-0 bg-dark" dark tile>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="toPage('/Home')" class="text-white"
                  >ホーム</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-weather-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="registerLimit" class="text-white"
                  >今日のコンディション投稿</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  @click="toPage('/MyMotivation')"
                  class="text-white"
                  >モチベーション履歴</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <template v-if="authority === 1">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi mdi-format-list-bulleted</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    @click="toPage('/EmployeeList')"
                    class="text-white"
                    >従業員一覧</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-if="authority === 1">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi mdi-chart-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    @click="toPage('/Aggregate')"
                    class="text-white"
                    >集計グラフ</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-if="authority === 1">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi mdi-cog-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    @click="toPage('AdminSetting')"
                    class="text-white"
                    >管理者設定</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <Logout class="px-4 my-5 fixed-bottom" />
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import Logout from "@/components/Logout";
import axios from "axios";

export default {
  components: {
    Logout,
  },
  computed: {
    authority: function() {
      return this.$store.state.login_user.user.authority;
    },
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
    registerLimit() {
      axios
        .post("http://localhost:8080/registerLimit", {
          userId: this.$store.state.login_user.userId,
        })
        .then(console.log(Response));
    },
  },
};
</script>
