<template>
  <v-data-table :headers="headers" :items="employees" class="elevation-1 card">
    <template v-slot:item.name="{ item }">
      <router-link
        :to="{
          name: 'EmployeeCondition',
          query: { item: encodeURIComponent(JSON.stringify(item)) },
        }"
        >{{ item.name }}</router-link
      >
    </template>
    <template v-slot:item.dep="{ item }">
      <span>{{ transferDepName(item.dep) }}</span>
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
  computed: {
    employees() {
      return this.items;
    },
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
          value: "lastPostDate",
          text: "最終投稿日",
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
          width: '30%'
        },
      ],
      items: [],
    };
  },
  methods: {
    toPage(item) {
      this.$router.push({
        name: "EmployeeCondition",
        query: { item: encodeURIComponent(JSON.stringify(item)) },
      });
    },

    /** 天候によって表示するアイコンを返すメソッド */
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
        return ["fas", "minus"];
      }
    },
    /** 天候によって色を返すメソッド */
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
        return { color: "#a9a9a9" };
      }
    },
    /** 部署IDを部署名に変換するメソッド */
    transferDepName(depId) {
      let dep = this.$store.state.depList.find((dep) => dep.depId === depId);
      return dep.depName;
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
