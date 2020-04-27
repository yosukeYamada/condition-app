<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <Header />
      </div>
    </v-app-bar>

    <v-content>
<<<<<<< HEAD
      <HelloWorld/>
      <router-view/>
=======
      <router-view />
>>>>>>> a3a9e1be9b7fa90d2ddb39c9afdaaa538f301328
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
