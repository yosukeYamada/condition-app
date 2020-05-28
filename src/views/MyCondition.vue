<template>
  <b-container fluid class="mt-5">
    <b-row align-v="center" align-h="center">
      <b-col sm="12" md="12" lg="10" xl="10">
        <div class="headline mb-4">マイコンディション履歴</div>
        <MyConditionList :daily-post-list="dailyPostList" />
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col sm="12" md="12" lg="10" xl="10">
        <b-card class="p-2 elevation-1">
          <b-card-text>
            <h2 class="title mb-4 ">あなたのコンディションチャート</h2>
            <b-row class="text-right">
              <b-col>
                <el-date-picker
                  v-model="selectedMonth"
                  class="text-right"
                  type="month"
                  placeholder="表示する月を選択"
                >
                </el-date-picker>
              </b-col>
            </b-row>
            <MyGraph :daily-post-list="dailyPostList" :selected-month="selectedMonth" />
            <small class="text-secondary pl-5">※ 凡例をクリックすることでグラフの表示非表示を切り替えることができます</small>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyConditionList from "@/components/my-condition/MyConditionList.vue";
import MyGraph from "@/components/my-condition/MyGraph.vue";
import axios from "axios";

export default {
  components: {
    MyConditionList,
    MyGraph,
  },
  data() {
    return {
      dailyPostList: [],
      selectedMonth: new Date(),
    };
  },
  created() {
    axios
      .post("/showDailyPosts", {
        userId: this.$store.state.loginUser.userId,
      })
      .then((response) => {
        console.log(response.data)
        this.dailyPostList = response.data;
      });
  },
};
</script>
