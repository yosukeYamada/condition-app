<template>
  <v-app style="background-color:#f5f5f5">
    <Header class="mb-5" />
    <b-container>
      <b-row align-v="center" align-h="center">
        <router-view />
      </b-row>
    </b-container>
    <AdminSideNav></AdminSideNav>
  </v-app>
</template>

<script>
import Header from "@/components/common/Header";
import AdminSideNav from "@/components/AdminSideNav";

export default {
  name: "App",
  components: {
    Header,
    AdminSideNav
  },
  data: () => ({}),
};
</script>
