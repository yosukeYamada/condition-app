<template>
  <div>
    <v-data-table :headers="headers" :items="employeeList" class="elevation-1 card">
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
import moment from "moment";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      employeeList: [],
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
  created() {
    this.setEmpDetailId(this.$route.params.userId)

    console.log(this.$store.state.empDetail)

    var list = this.$store.state.employeeList.filter(
      (elm) => elm.userId === this.$store.state.empDetail
    );

    // this.setEmpDetail(list.)

    console.log(list)

    for (let num in this.$store.state.empDetail) {
      var employeeList = []
      employeeList.push({
        date: moment(this.$store.state.empDetail[num].date).format("YYYY-MM-DD"),
        motivation:
          this.$store.state.empDetait[num].postedMotivation.motivation.motivationName,
        condition:
          this.$store.state.empDetail[num].postedCondition.condition.conditionName,
        performance:
          this.$store.state.empDetail[num].postedPerformance.performance.performanceName,
        comment: this.$store.state.empDetail[num].postedComment.comment,
      });
    }
    this.setEmpDetail(employeeList)
    this.employeeList = this.$store.state.empDetail
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月");
    },
  },
  beforeDestroy() {
    this.$store.dispatch("setEmpDetail", "");
  },
  methods: {
    ...mapActions(['setEmpDetail', 'setEmpDetailId']),

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
  },
};
</script>