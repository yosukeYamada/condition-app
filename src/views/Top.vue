<template>
  <b-col>
    <Jumbotron />
    <UpdateInfo />
    <About />
    <hr>
    <Develop />
  </b-col>
</template>
<script>
import Jumbotron from "@/components/top/Jumbotron.vue";
import About from "@/components/top/About.vue";
import UpdateInfo from "@/components/top/UpdateInfo.vue";
import Develop from "@/components/top/Develop.vue";
export default {
  components: {
    Jumbotron,
    About,
    UpdateInfo,
    Develop,
  },
};
</script>
