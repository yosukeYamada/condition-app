<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col>
        <h2 class="mb-4">ホーム</h2>
        <b-row>
          <b-col sm="8">
            <HomeNews />
          </b-col>
        </b-row>
        <b-row v-if="authority === 1">
          <b-col sm="6">
            <RecentPosts />
          </b-col>
          <b-col sm="6">
            <InputRate />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HomeNews from "@/components/home/HomeNews";
import RecentPosts from "@/components/home/RecentPosts";
import InputRate from "@/components/home/InputRate";
export default {
  components: {
    HomeNews,
    RecentPosts,
    InputRate
  },
  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    }
  }
};
</script>
