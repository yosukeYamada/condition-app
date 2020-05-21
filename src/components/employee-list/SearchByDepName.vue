<template>
  <el-select id="dep" v-model="filterDepName" clearable placeholder="部署名">
    <el-option
      v-for="depName in this.$store.state.depList"
      :key="depName.depId"
      :label="depName.depName"
      :value="depName.depId"
    >
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      depNameArray: [],
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
    filterDepName: {
      get() {
        return this.inputDepName;
      },
      set(value) {
        this.inputDepName = value;
      },
    },
  },
  watch: {
    /** storeのdepListの変更の監視 */
    setDepNameArray: function(newDepList) {
      let depNameArray = newDepList.map((dep) => dep.depName);
      depNameArray.push("全ての従業員");
      this.depNameArray = depNameArray;
    },
    //カテゴリー検索（部署名）の変更の監視
    filterDepName: function() {
      // this.$store.dispatch("setFilterDepName", this.inputDepName);
      this.$store.dispatch("filter/setFilterDepName",this.inputDepName)
    },
  },
  mounted() {
    let depNameArray = this.$store.state.depList.map((dep) => dep.depName);
    depNameArray.push("全ての従業員");
    this.depNameArray = depNameArray;
  },
  beforeDestroy() {
    // this.$store.dispatch("setFilterDepName", "");
    this.$store.dispatch("filter/setFilterDepName",this.inputDepName)
  },
};
</script>
<style>
#dep:hover {
  cursor: pointer;
  border-color: #89c997;
}
</style>
