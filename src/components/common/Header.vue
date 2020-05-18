<template>
  <div>
    <b-navbar type="dark" variant="success">
      <router-link to="/login">
        <b-navbar-brand class="ml-1 mr-5 display-1 font-weight-bold">Rakuppo</b-navbar-brand>
      </router-link>
        <v-app-bar-nav-icon class="mr-auto ml-5 text-white" id="app" v-if="this.$store.state.loginStatus">
          <b-button variant="success" v-b-toggle.sidebar-backdrop>
            Menu
          </b-button>
        </v-app-bar-nav-icon>
    </b-navbar>
  </div>
</template>
<script>
export default {};
</script>