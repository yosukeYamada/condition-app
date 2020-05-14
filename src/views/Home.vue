<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col>
        <h2 class="mb-4">ホーム</h2>
        <b-row>
          <b-col sm="8">
            <Infomation />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="8">
            <RecentPosts v-if="authority === 1" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Infomation from "@/components/home/Infomation";
import RecentPosts from "@/components/home/RecentPosts";
export default {
  components: {
    Infomation,
    RecentPosts,
  },
  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    },
  },
};
</script>
