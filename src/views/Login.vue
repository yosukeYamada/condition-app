<template>
  <div>
    <Login></Login>

    <!-- <div id="app">
      <div v-for="user in users" :key="user.id">{{ user.name }}</div>
    </div> -->
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setLoginUser"])
  },
  components: {
    Login
  },
  // computed: {
  //   users: function() {
  //     return this.$store.state.users;
  //   }
  // },
  // mounted() {
  //   this.$store.dispatch("getUsers");
  // }
};
</script>

<style>
#header-fixed {
  position: fixed; /* ヘッダーの固定 */
  top: 0px; /* 位置(上0px) */
  left: 0px; /* 位置(右0px) */
  width: 100%; /* 横幅100%*/
  height: 140px; /* 縦幅140px */
}

#header {
  background-color: #ccffcc; /* 背景色(黒) */
  padding: 10px 0 20px; /* 上10px、下20pxをあける */
  height: 110px; /* 縦の高さ110px */
  width: 100%; /* 横の幅を100% */
}

#login {
  padding: 0px; /* 余白指定 */
  top: 0; /* 位置指定 */
  bottom: 30%; /* 位置指定 */
  left: 0; /* 位置指定 */
  position: absolute;
  margin: auto;
  width: 100%;
  height: 110px;
}
</style>