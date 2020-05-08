<template>
  <div>
    <h4>
      {{this.$store.state.employeeList.filter(elm => elm.userId === this.$route.params.userId)[0].hireDate | moment}}入社
      {{this.$store.state.employeeList.filter(elm => elm.userId === this.$route.params.userId)[0].dep.depName}}
      {{this.$store.state.employeeList.filter(elm => elm.userId === this.$route.params.userId)[0].userName}}のモチベーション履歴
    </h4>
    <v-data-table :headers="headers" :items="employeeList">
      <template v-slot:item.motivation="{ item }">
        <v-fa
          :icon="transferIcon(item.motivation)"
          size="lg"
          :style="transferColor(item.motivation)"
        />
      </template>
      <template v-slot:item.condition="{ item }">
        <v-fa
          :icon="transferIcon(item.condition)"
          size="lg"
          :style="transferColor(item.condition)"
        />
      </template>
      <template v-slot:item.performance="{ item }">
        <v-fa
          :icon="transferIcon(item.performance)"
          size="lg"
          :style="transferColor(item.performance)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from "vuex";
import axios from "axios";
import firebase from "firebase/app";

export default {
   data() {
    return {
      employeeList:[],
      headers: [
        {
          value: "date",
          text: "投稿日",
          sortable: true,
        },
        {
          value: "motivation",
          text: "やる気",
          sortable: true,
        },
        {
          value: "condition",
          text: "体調",
          sortable: true,
        },
        {
          value: "performance",
          text: "成果",
          sortable: true,
        },
        {
          value: "comment",
          text: "コメント",
          sortable: true,
        },
      ],
    }
  },
  mounted() {
    var list = this.$store.state.employeeList.filter(elm => elm.userId === this.$route.params.userId)
    console.log(list)
    for(let num in list[0].dailyPost) {
      this.employeeList.push({
        date: moment(this.$store.state.employeeList[0].dailyPost[num].date).format("YYYY-MM-DD"), 
        motivation: this.$store.state.employeeList[0].dailyPost[num].postedMotivation.motivation.motivationName,
        condition: this.$store.state.employeeList[0].dailyPost[num].postedCondition.condition.conditionName,
        performance: this.$store.state.employeeList[0].dailyPost[num].postedPerformance.performance.performanceName,
        comment: this.$store.state.employeeList[0].dailyPost[num].postedComment.comment
      })
    }
  },
  filters: {
        moment: function (date) {
            return moment(date).format('YYYY年MM月');
        }
  },
  methods: {
    transferIcon(param) {
      if (param === "快晴") {
        return ["fas", "sun"];
      } else if (param === "晴") {
        return ["fas", "cloud-sun"];
      } else if (param === "曇") {
        return ["fas", "cloud"];
      } else if (param === "雨") {
        return ["fas", "cloud-rain"];
      } else if (param === "嵐") {
        return ["fas", "cloud-showers-heavy"];
      } else {
        return ["fas", "question"];
      }
    },
    transferColor(param) {
      if (param === "快晴") {
        return { color: "#ea5550" };
      } else if (param === "晴") {
        return { color: "#f3981d" };
      } else if (param === "曇") {
        return { color: "#b2cbe4" };
      } else if (param === "雨") {
        return { color: "#68a4d9" };
      } else if (param === "嵐") {
        return { color: "#0075c2" };
      } else {
        return { color: "black" };
      }
    },
    //これがないとfirabaseのユーザー情報をstateに格納できない
     ...mapActions([
      "setFirebaseUser"
    ])
  },
   //リロード時にログインユーザー情報を保持する
    init() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    },
  created() {
    this.getMasterList();
    // firebase.auth().setPersistance(firebase.auth.Auth.Persistance.SESSION);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("http://localhost:8080/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.user.authority);
            console.log(response.data);

            this.$store.dispatch("setLoginUser", response.data);
          });
      }
    });
  },
};
</script>