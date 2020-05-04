<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1 card">
    <template v-slot:item.name="{ item }">
      <span v-text="item.name" @click="toPage(item.userId)"></span>
    </template>
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
</template>

<script>
export default {
  props: {
    employeeList: Array,
  },
  watch: {
    employeeList: function() {
      this.items = this.employeeList;
    },
  },
  data() {
    return {
      headers: [
        {
          value: "name",
          text: "名前",
          sortable: true,
        },
        {
          value: "dep",
          text: "部署名",
          sortable: true,
        },
        {
          value: "hireDate",
          text: "入社月",
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
      items: [],
    };
  },
  methods: {
    toPage(userId) {
      alert(
        "ユーザーID:" +
          userId +
          "の個別の履歴を見に行きます！(個別ページは現在開発中です！)"
      );
      // this.$router.push("/MotivHistory/" + userId);
    },
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
  mounted() {
    this.items = this.employeeList;
  },
};
</script>
<style>
.theme--light.v-data-table thead tr th {
  background-color: #28a745 !important;
  color: white !important;
}
</style>
