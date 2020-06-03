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
    <el-select
      id="dep"
      style="width:100%;"
      v-model="depName"
      placeholder="部署名"
    >
      <el-option
        v-for="dep in this.depList"
        :key="dep.depId"
        :label="dep.depName"
        :value="dep.depId"
      >
      </el-option>
    </el-select>

    <b-list-group
      v-if="this.unansweredList.length !== 0"
      flush
      id="resent-posts-list"
    >
      <b-list-group-item
        v-for="(unanswered ,index) in this.unansweredList"
        :key="index"
      >
        <div>
          <b-row>
            <b-col lg="1">
              <v-fa
                :icon="['far', 'frown']"
                size="lg"
                class="blue--text text--darken-2 mr-4"
              ></v-fa>
            </b-col>
            <b-col lg="3">
              <span>{{ unanswered.hireDate | moment }}入社</span>
            </b-col>
            <b-col lg="3">
              <span>{{ transferDepName(unanswered.depId) }}</span>
            </b-col>
            <b-col lg="3">
              <span>{{ unanswered.userName + "さん" }}</span>
            </b-col>
            <b-col lg="2">
              <b-btn
                v-if="unansweredId[index] !== unanswered.userId"
                variant="danger"
                class="contact"
                :key="unanswered.userId"
                :value="isPush"
                @click="
                  sendMail(unanswered.userId,unanswered.userName, unanswered.mailList[0].mailName)
                "
                >連絡</b-btn
              >
              <b-btn
                v-if="unansweredId[index] === unanswered.userId"
                variant="danger"
                class="contact"
                :key="unanswered.userId"
                :disabled="true"
                @click="
                  sendMail(unanswered.userId,unanswered.userName, unanswered.mailList[0].mailName)
                "
                >連絡済み</b-btn
              >
             
             
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
import axios from "axios";
export default {
  data() {
    return {
      unansweredList: [],
      depName: 0,
      depList: [],
      isPush:true,
      index:"",
      unansweredId:[]
    };
  },
  watch: {
    employeeList: function() {
      this.unansweredList = this.setUnanswered();
    },
    depName: function() {
      if (this.depName == 0) {
        this.unansweredList = this.setUnanswered();
      } else {
        this.unansweredList = this.setUnanswered().filter(
          (employee) => employee.depId === this.depName
        );
      }
    },
  },
  computed: {
    employeeList() {
      return this.$store.state.employeeList;
    },
  },
  methods: {
    /** 従業員一覧から未投稿者一覧を作成 */
    setUnanswered() {
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
    sendMail(userId,userName, mailName) {
      // console.log(userId)
      this.$store.dispatch("setUnansweredId",userId)
      this.unansweredId = this.$store.state.unAnsweredId
      console.log(this.$store.state.unAnsweredId)
      axios
        .post("/sendMail", {
          userName: userName,
          mail: mailName,
        })
        .then(() => {
      
          alert("メールを送信しました");
        })
        .catch((e) => {
          alert("メール送信に失敗しました：" + e);
        });
        
    },
  },
  mounted() {
    
    this.unansweredList = this.setUnanswered();
    console.log(this.unansweredId)
    this.depList = Array.from(this.$store.state.depList);
    this.depList.unshift({
      depId: 0,
      depName: "全従業員",
    });
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月");
    },
  },
};
</script>

<style scoped>
#resent-posts-list {
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.contact {
  color: white;
  font-weight: bold;
  font-size: 14px;
}
</style>
