<template>
  <v-app style="background-color:#f5f5f5">
    <Header />
    <router-view />
    <SideMenu></SideMenu>
  </v-app>
</template>

<script>
import Header from "@/components/common/Header";
import SideMenu from "@/components/common/SideMenu";

export default {
  name: "App",
  components: {
    Header,
    SideMenu
  },
  

  
};
</script>
