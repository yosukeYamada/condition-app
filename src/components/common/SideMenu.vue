<template>
  <div id="adminside" v-if="$store.state.loginUser">
    <div class="sideMenu">
      <b-sidebar id="sidebar-backdrop" bg-variant="dark" text-variant="light" backdrop shadow>
        <div class="px-4 mb-5 display-1 font-weight-medium">Menu</div>
        <v-list class="py-0 bg-dark" dark tile>
          <v-list-item-group>
            <!-- ホーム -->
            <v-list-item @click="toPage('/home')">
              <v-list-item-icon>
                <v-icon>mdi mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-white">ホーム</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- 今日のコンディション投稿 -->
            <v-list-item @click="registerLimit">
              <v-list-item-icon>
                <v-icon>mdi mdi-weather-sunny</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-white">今日のコンディション投稿</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- コンディション履歴 -->
            <v-list-item @click="toPage('/myCondition')">
              <v-list-item-icon>
                <v-icon>mdi mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-white">コンディション履歴</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- 従業員一覧 -->
            <template v-if="authority === ADMIN">
              <v-list-item @click="toPage('/employeeList')">
                <v-list-item-icon>
                  <v-icon>mdi mdi-format-list-bulleted</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-white">従業員一覧</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <!-- 集計グラフ -->
            <template v-if="authority === ADMIN">
              <v-list-item @click="toPage('/aggregate')">
                <v-list-item-icon>
                  <v-icon>mdi mdi-chart-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-white">集計グラフ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <!-- 管理者設定 -->
            <template v-if="authority === ADMIN">
              <v-list-item @click="toPage('adminSetting')">
                <v-list-item-icon>
                  <v-icon>mdi mdi-cog-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-white">管理者設定</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <Logout :class="logoutClass" />
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import Logout from "@/components/common/Logout";
import axios from "axios";
import { mapActions } from "vuex";
import AUTHORITY from "@/assets/js/Authority.js";

export default {
  components: {
    Logout
  },
  data() {
    return {
      ADMIN: AUTHORITY.ADMIN,
      logoutClass: ["px-4", "my-5", "fixed-bottom"]
    };
  },
  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    }
  },
  methods: {
    ...mapActions(["employeeList"]),
    toPage(path) {
      this.$router.push(path);
    },
    registerLimit() {
      axios
        .post("/registerLimit", {
          userId: this.$store.state.loginUser.userId
        })
        .then(response => {
          if (response.data) {
            alert("投稿は1日1回です");
          } else {
            this.$router.push("/dailyPost");
          }
        });
    },
    abjustLogout() {
      if (window.innerHeight < 600) {
        this.logoutClass = ["px-4", "my-5"];
      } else {
        this.logoutClass = ["px-4", "my-5", "fixed-bottom"];
      }
    }
  },
  mounted() {
    this.abjustLogout();
    window.addEventListener("resize", this.abjustLogout);
  }
};
</script>
