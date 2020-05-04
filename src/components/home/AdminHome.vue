<template>
  <div>
    <h2>HOME画面(管理者)</h2>
    <b-row>
      <b-col sm="8">
        <Infomation />
      </b-col>
      <b-col sm="8">
        <RecentPosts />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Infomation from "@/components/home/Infomation";
import RecentPosts from "@/components/home/RecentPosts";
export default {
  components: {
    RecentPosts,
    Infomation
  },
};
</script>
