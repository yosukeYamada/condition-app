<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="未回答者一覧"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
    class="h-100"
  >
    <el-select id="dep" style="width:100%;" v-model="filterDepName" placeholder="部署名">
      <el-option
        v-for="dep in this.depList"
        :key="dep.depId"
        :label="dep.depName"
        :value="dep.depId"
      >
      </el-option>
    </el-select>

    <b-list-group
      v-if="unansweredList.length !== 0"
      flush
      id="resent-posts-list"
    >
      <b-list-group-item v-for="(unanswered, i) in unansweredList" :key="i">
        <div>
          <b-row>
          <b-col>未投稿
          <v-fa :icon="['far','frown']" size="lg" class="blue--text text--darken-2 mr-4"></v-fa>
          </b-col>
          <b-col>
          <span>{{ transferDepName(unanswered.depId) }}</span>
          </b-col>
          <b-col>
          <span>{{ unanswered.userName + "さん" }}</span>
          </b-col>
          </b-row>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-card-text v-if="unansweredList.length === 0">
      <div class="p-3 grey--text">本日の未回答者はいません</div>
    </b-card-text>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      unansweredList: [],
      inputDepName: 0,
      depList:[]
    };
  },
  watch: {
    employeeList: function() {
      this.unansweredList = this.setUnansweredList
    },
    filterDepName: function() {
      this.$store.dispatch("filter/setFilterDepName",this.inputDepName)
    }
  },
  computed: {
    employeeList() {
      return this.$store.state.employeeList;
    },
    filterDepName: {
      get() {
        return this.inputDepName;
      },
      set(value) {
        this.inputDepName = value;
      },
    },
  },
  methods: {
    /** 従業員一覧から未投稿者一覧を作成 */
    setUnansweredList() {
      var unansweredList = []; //未投稿者のリスト
      var preToday = new Date(); //今日の日付
      var employeeList = this.employeeList;
      // 投稿数0の従業員に仮で投稿日付を与える
      for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].dailyPost.length === 0) {
          /** 投稿数が0の場合 */
          unansweredList.push(employeeList[i]);
        } else {
          /** 投稿がある場合 */
          if (
            moment(employeeList[i].dailyPost[0].date).isBefore(preToday, "day")
          ) {
            /** 最新の投稿日が今日より前の場合 */
            unansweredList.push(employeeList[i]);
          }
        }
      }
      return unansweredList;
    },
    /** 部署IDを部署名に変換するメソッド */
    transferDepName(depId) {
      let dep = this.$store.state.depList.find((dep) => dep.depId === depId);
      return dep.depName;
    },
  },
  mounted() {
    this.unansweredList = this.setUnansweredList();

    this.depList = Array.from(this.$store.state.depList)
    this.depList.unshift({
      depId : 0,
      depName: '全従業員'
    })
  },
  beforeDestroy() {
    this.$store.dispatch("filter/setFilterDepName","")
  },
};
</script>

<style scoped>
#resent-posts-list {
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>