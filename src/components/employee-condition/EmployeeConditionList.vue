<template>
  <v-data-table
    :headers="headers"
    :items="dailyPostList"
    class="elevation-1 card"
  >
    <template v-slot:item.date="{ item }">
      {{ toDate(item.date) }}
    </template>
    <template v-slot:item.motivation="{ item }">
      <v-fa
        :icon="transferIcon(item.postedMotivation.motivation.motivationName)"
        size="lg"
        :style="transferColor(item.postedMotivation.motivation.motivationName)"
      />
    </template>
    <template v-slot:item.condition="{ item }">
      <v-fa
        :icon="transferIcon(item.postedCondition.condition.conditionName)"
        size="lg"
        :style="transferColor(item.postedCondition.condition.conditionName)"
      />
    </template>
    <template v-slot:item.performance="{ item }">
      <v-fa
        :icon="transferIcon(item.postedPerformance.performance.performanceName)"
        size="lg"
        :style="
          transferColor(item.postedPerformance.performance.performanceName)
        "
      />
    </template>
    <template v-slot:item.comment="{ item }">
      {{ item.postedComment.comment }}
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
    };
  },
  computed: {
    dailyPostList() {
      let employee = this.$store.state.employeeList.find(
        (employee) =>
          employee.userId ===
          JSON.parse(decodeURIComponent(this.$route.query.item)).userId
      );
      return employee.dailyPost;
    },
  },
  methods: {
    ...mapActions(["setEmpDetail", "setEmpDetailId"]),
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
    toDate(stringDate) {
      if (stringDate !== null) {
        return moment(stringDate).format("YYYY-MM-DD");
      } else {
        return "-";
      }
    },
  },
  beforeDestroy() {
    this.$store.dispatch("setEmpDetail", "");
  },
};
</script>
