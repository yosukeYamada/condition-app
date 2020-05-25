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
    <b-container class="mb-5">
      <v-divider></v-divider>
      <b-row>
        <b-col>
          <Develop />
        </b-col>
      </b-row>
      <v-divider></v-divider>
    </b-container>
    <Footer />
  </div>
</template>
<script>
import Jumbotron from "@/components/top/Jumbotron.vue";
import About from "@/components/top/About.vue";
import UpdateInfo from "@/components/top/UpdateInfo.vue";
import Develop from "@/components/top/Develop.vue";
import Footer from "@/components/top/Footer.vue";
export default {
  components: {
    Jumbotron,
    About,
    UpdateInfo,
    Develop,
    Footer,
  },
  mounted(){
    console.log(this.$store.state.employeeList)
  }
};
</script>
