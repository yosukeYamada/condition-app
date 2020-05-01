<template>
  <v-app style="background-color:#f5f5f5">
    <Header class="mb-5" />
    <b-container>
      <b-row align-v="center" align-h="center">
        <router-view />
      </b-row>
    </b-container>
    <SideMenu></SideMenu>
  </v-app>
</template>

<script>
import Header from "@/components/common/Header";
import SideMenu from "@/components/SideMenu";

export default {
  name: "App",
  components: {
    Header,
    SideMenu
  },
  data: () => ({}),
};
</script>
