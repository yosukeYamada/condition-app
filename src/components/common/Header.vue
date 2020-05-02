<template>
  <div>
    <b-navbar type="dark" variant="success">
      <router-link to="/">
        <b-navbar-brand>Rakuppo</b-navbar-brand>
      </router-link>
      <v-app-bar-nav-icon class="mr-auto ml-5 text-white">
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
