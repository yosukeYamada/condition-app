<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="本日未投稿者リスト"
    header-bg-variant="success"
    header-text-variant="white"
  >
    <b-card-text>
      <div class="mb-5" v-for="(latestPost,i ) in latestPosts" :key="i">
        <p class="mb-2 font-weight-bold">
          <span>{{ latestPost.name + "さん" }}</span>
          <span>   {{ latestPost.post + "です"}}</span>
        </p>
      </div>
    </b-card-text>
  </b-card>
  
</template>
<script>
import store from "../../store/index"
export default {
  watch: {},
  data() {
    return {
      items: [],
      latestPosts: []
    };
  },
  methods: {
    setLatestPosts(param){
      var latestPosts = []
      var resultPosts = []
      var preToday = new Date();
      var today = new Date(
        preToday.getFullYear(),
        preToday.getMonth(),
        preToday.getDate(),
        0,
        0
      );
     
      for(let i = 0; i < param.length; i++){
        var latestPost = {
        date: "",
        name: "",
        post: ""
        }
        //投稿が０の場合
        if(param[i].dailyPost.length === 0){
          latestPost.date = "2020-05-13T00:43:14.943+0000" //今日以前の日付
          latestPost.name = param[i].userName
          latestPost.post = "未投稿"
          latestPosts.push(latestPost);
          //投稿がある場合
        }else{
          latestPost.date = param[i].dailyPost[0].date
          latestPost.name = param[i].userName
          latestPost.post = ""
          latestPosts.push(latestPost);
        }
        
      }
      for(let i = 0; i < latestPosts.length; i++){
        // var dateStr = param[i].dailyPost[0].date
          var str = latestPosts[i].date;
          var result = str.split('T');
          var result2 = result[0].split('-');
          var rdate = new Date(
            result2[0],
            result2[1] -1,
            result2[2],
            0,
            0
          )
          latestPosts[i].date = rdate;
      }
      
      for(let i = 0; i < latestPosts.length; i++){
        if(latestPosts[i].date.getTime() !== today.getTime()){
          var resultPost = {
            date: "",
            name: "",
            post: ""
          }
          resultPost.date = latestPosts[i].date
          resultPost.name = latestPosts[i].name
          resultPost.post = "未投稿"        
          resultPosts.push(resultPost);
        }
      }
      return resultPosts;
    },
  },
  mounted() {
    this.items = store.state.employeeList
    this.latestPosts = this.setLatestPosts(this.items)
  },
};
</script>
<style>
.theme--light.v-data-table thead tr th {
  background-color: #28a745 !important;
  color: white !important;
}
</style>
