<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dailyPost"
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
      <template v-slot:item.comment="{ item }">
        {{ item.comment }}
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
      headers: [
        {
          value: "date",
          text: "投稿日",
          sortable: true,
          width: "15%",
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
          width: "50%",
        },
        {
          value: "actions",
          text: "編集",
          sortable: true,
        },
      ],
    };
  },
  props: ["dailyPostList"],
  computed: {
    dailyPost() {
      var dailyPost = [];
      for (let num in this.dailyPostList) {
        dailyPost.push({
          date: moment(this.dailyPostList[num].date).format("YYYY-MM-DD"),
          condition: this.dailyPostList[num].postedCondition.condition
            .conditionName,
          motivation: this.dailyPostList[num].postedMotivation.motivation
            .motivationName,
          performance: this.dailyPostList[num].postedPerformance.performance
            .performanceName,
          comment: this.dailyPostList[num].postedComment.comment,
          conditionId: this.dailyPostList[num].postedCondition.condition
            .conditionId,
          motivationId: this.dailyPostList[num].postedMotivation.motivation
            .motivationId,
          performanceId: this.dailyPostList[num].postedPerformance.performance
            .performanceId,
          version: this.dailyPostList[num].version,
          dailyPostId: this.dailyPostList[num].dailyPostId,
        });
      }
      return dailyPost;
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
        query: { item: encodeURIComponent(JSON.stringify(item)) },
      });
    },
  },
};
</script>

<style scoped>
.edit:hover {
  cursor: pointer;
  color: blue;
}
</style>
