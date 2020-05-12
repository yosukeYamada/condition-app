<template>
  <div>
    <Jumbotron />
    <b-container>
      <b-row align-v="center" align-h="center">
        <b-col sm="8">
          <UpdateInfo />
        </b-col>
      </b-row>
    </b-container>
    <About />
    <hr />
    <Develop />
  </div>
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
