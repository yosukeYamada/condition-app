<template>
  <div>
    <b-navbar type="dark" variant="success">
      <!-- サイドバー表示 -->
      <v-app-bar-nav-icon
        color="white"
        class="mr-1"
        v-if="this.$store.state.loginStatus"
        variant="success"
        v-b-toggle.sidebar-backdrop
      ></v-app-bar-nav-icon>
      <!-- ログイン中に表示させておくロゴ -->
      <router-link v-if="this.$store.state.loginStatus" to="/login">
        <b-navbar-brand class="ml-1 mr-5 display-1 font-weight-bold">Rakuppo</b-navbar-brand>
      </router-link>
      <!-- ログアウト時に表示させておくロゴ -->
      <router-link v-if="this.$store.state.loginStatus === false" to="/">
        <b-navbar-brand class="ml-1 mr-5 display-1 font-weight-bold">Rakuppo</b-navbar-brand>
      </router-link>
    </b-navbar>
  </div>
</template>
<script>
export default {};
</script>
