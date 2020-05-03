<template>
  <div>
    <b-table striped hover :items="dailyPost"></b-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      dailyPost:[]
    }
  },
  mounted() {
    for(let num in this.$store.state.login_user.user.dailyPost) {
      this.dailyPost.push(
        { '日付': moment(this.$store.state.login_user.user.dailyPost[num].date).format("YYYY-MM-DD"), 
        '体調': this.$store.state.login_user.user.dailyPost[num].postedCondition.condition.conditionName,
        'やる気': this.$store.state.login_user.user.dailyPost[num].postedMotivation.motivation.motivationName,
        '成果': this.$store.state.login_user.user.dailyPost[num].postedPerformance.performance.performanceName,
        'その他':this.$store.state.login_user.user.dailyPost[num].postedComment.comment}
      )
    }
    console.log(this.dailyPost)
  },
};
</script>