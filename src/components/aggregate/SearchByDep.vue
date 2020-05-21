<template>
  <el-select id="dep" v-model="filterDepName" clearable placeholder="部署名">
    <el-option
      v-for="dep in this.depList"
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
      depList:[
        {
          depId : 0,
          depName: '全従業員'
        },
        {
          depId : 1,
          depName: 'アプリエンジニア'
        },
        {
          depId : 2,
          depName: 'クラウドエンジニア'
        },
        {
          depId : 3,
          depName: '機械学習エンジニア'
        },
        {
          depId : 4,
          depName: '内勤'
        },
      ]
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
  },
};
</script>

<style>
#dep:hover {
  cursor: pointer;
  border-color: #60eeff;
}
</style>