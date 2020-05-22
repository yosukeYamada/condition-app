<template>
  <el-select id="dep" style="width:100%;" v-model="filterDepName" clearable placeholder="部署名">
    <el-option
      v-for="dep in this.$store.state.depList"
      :key="dep.depId"
      :label="dep.depName"
      :value="dep.depId"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      inputDepName: 0,
      depList:[]
    };
  },
  computed: {
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
    //カテゴリー検索（部署名）の変更の監視
    filterDepName: function() {
      this.$store.dispatch('aggregate/setDepId', this.filterDepName)
    }
  },
  beforeDestroy() {
    this.$store.dispatch("aggregate/setDepId", "");
    this.depList.splice(this.depList)
  },
  created() {
    this.depList = this.$store.state.depList
    this.depList.unshift({
      depId : 0,
      depName: '全従業員'
    })
  }
};
</script>

<style scoped>
#dep:hover {
  cursor: pointer;
  border-color: #89c997;
}
</style>