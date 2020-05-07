<template>
  <b-col>
    <Jumbotron />
    <About />
    <UpdateInfo />
  </b-col>
</template>
<script>
import Jumbotron from "@/components/top/Jumbotron.vue";
import About from "@/components/top/About.vue";
import UpdateInfo from "@/components/top/UpdateInfo.vue";
export default {
  components: {
    Jumbotron,
    About,
    UpdateInfo,
  },
};
</script>
