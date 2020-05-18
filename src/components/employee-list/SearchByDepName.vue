<template>
  <el-select
    v-model="inputDepName"
    clearable
    @change="changeDepName()"
    placeholder="部署名"
  >
    <el-option
      v-for="depName in depNames"
      :key="depName.value"
      :label="depName.label"
      :value="depName.value"
    >
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      depNames: [
        {
          value: "アプリエンジニア",
          label: "アプリエンジニア",
        },
        {
          value: "クラウドエンジニア",
          label: "クラウドエンジニア",
        },
        {
          value: "機械学習エンジニア",
          label: "機械学習エンジニア",
        },
        {
          value: "内勤",
          label: "内勤",
        },
        {
          value: "全ての社員",
          label: "全ての社員",
        },
      ],

      depNameArray: [],

      filterDepName: "",

      inputDepName: "",

      filteredEmployeeList: {},
    };
  },
  computed: {
    ...mapGetters(["filterEmployeeList"]),
    /** storeのdepListの取得 */
    setDepNameArray: function() {
      return this.$store.state.depList;
    },
  },
  watch: {
    /** storeのdepListの変更の監視 */
    setDepNameArray: function(newDepList) {
      let depNameArray = newDepList.map((dep) => dep.depName);
      depNameArray.push("全ての従業員");
      this.depNameArray = depNameArray;
    },
  },
  created() {
    this.$store.dispatch("setFilterDepName", this.inputDepName);
  },
  beforeDestroy() {
    // this.$store.dispatch("setFilterDepName", "");

    this.$store.dispatch("setFilterDepName", "");
  },
  methods: {
    //従業員絞り込み用のメソッド

    changeDepName() {
      // this.$store.dispatch("setFilterDepName", this.filterDepName);
      // console.log("2:filterの中身" + this.$store.state.filterDepName);
    },
    handleChangeQuery() {
      this.$store.dispatch("setFilterDepName", this.filterDepName);
      //従業員リストを部署名と入社年月で絞り込む

      this.$store.dispatch("setFilterDepName", this.inputDepName);
    },
  },
  mounted() {
    /** セレクトボックスの部署一覧を初期化 */
    let depNameArray = this.$store.state.depList.map((dep) => dep.depName);
    depNameArray.push("全ての従業員");
    this.depNameArray = depNameArray;
  },
};
</script>
<style></style>
