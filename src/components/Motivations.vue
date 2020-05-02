<template>
  <div id="content">
    <h1>モチベ履歴</h1>
    <table border="1">
      <tr>
        <th>日付</th>
        <th>体調</th>
        <th>やる気</th>
        <th>成果</th>
        <th>その他</th>
      </tr>
      <tr v-for="dailypost in dailyPostList" :key="dailypost.dailypostId">
        <td>{{ dailypost.date | moment }}</td>
        <td>{{ dailypost.postedCondition.condition.conditionName }}</td>
        <td>{{ dailypost.postedMotivation.motivation.motivationName }}</td>
        <td>{{ dailypost.postedPerformance.performance.performanceName }}</td>
        <td>{{ dailypost.postedComment.comment }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import axios from "axios";
import moment from 'moment'
export default {
  data() {
    return {
      dailyPostList:[]
    }
  },
  mounted() {
    console.log(this.$store.state.login_user.user.dailyPost)
    this.dailyPostList = this.$store.state.login_user.user.dailyPost
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY-MM-DD")
    }
  }
};
</script>
