<template>
  <v-app>
    
      <div class="d-flex align-center">
        <Header />
      </div>
    

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style>

#adminside{
  margin :40% auto;

}
.b-sidebar{
  background-color: #66CC66; 
  
}





</style>
