<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dailyPostList"
      class="card elevation-1"
    >
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
      <template v-slot:item.actions="{ item }">
        <v-fa
          :icon="['fas', 'edit']"
          size="lg"
          @click="edit(item)"
          class="edit"
          color="#2075D2"
        >
        </v-fa>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      editPost: [],
      dailyPost: [],
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
        {
          value: "actions",
          text: "編集",
          sortable: true,
        },
      ],
    };
  },
  components: {},
  computed: {
    dailyPostList() {
      var dailyPostList = [];
      for (let num in this.$store.state.loginUser.dailyPost) {
        dailyPostList.push({
          date: moment(this.$store.state.loginUser.dailyPost[num].date).format(
            "YYYY-MM-DD"
          ),
          condition: this.$store.state.loginUser.dailyPost[num].postedCondition
            .condition.conditionName,
          motivation: this.$store.state.loginUser.dailyPost[num]
            .postedMotivation.motivation.motivationName,
          performance: this.$store.state.loginUser.dailyPost[num]
            .postedPerformance.performance.performanceName,
          comment: this.$store.state.loginUser.dailyPost[num].postedComment
            .comment,
          conditionId: this.$store.state.loginUser.dailyPost[num]
            .postedCondition.condition.conditionId,
          motivationId: this.$store.state.loginUser.dailyPost[num]
            .postedMotivation.motivation.motivationId,
          performanceId: this.$store.state.loginUser.dailyPost[num]
            .postedPerformance.performance.performanceId,
          version: this.$store.state.loginUser.dailyPost[num].version,
          dailyPostId: this.$store.state.loginUser.dailyPost[num].dailyPostId,
        });
      }
      return dailyPostList;
    },
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
    edit(item) {
      this.$router.push({
        name: "EditDailyPost",
        params: {
          dailyPostId: item.dailyPostId,
          motivationId: item.motivationId,
          conditionId: item.conditionId,
          performanceId: item.performanceId,
          comment: item.comment,
          version: item.version,
        },
      });
    },
  },
};
</script>

<style scoped>
.edit:hover {
  cursor: pointer;
  color:blue;
}
</style>
