<template>
  <el-select
    id="year"
    v-model="filterHireYear"
    clearable
    placeholder="入社した年"
  >
    <el-option
      v-for="year in hireYear"
      :key="year.value"
      :label="year.label"
      :value="year.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      hireYear: [
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2018",
          label: "2018",
        },
        {
          value: "2017",
          label: "2017",
        },
        {
          value: "2016",
          label: "2016",
        },
        {
          value: "2015",
          label: "2015",
        },
        {
          value: "2014",
          label: "2014",
        },
        {
          value: "2013",
          label: "2013",
        },
        {
          value: "2012",
          label: "2012",
        },
        {
          value: "2011",
          label: "2011",
        },
        {
          value: "2010",
          label: "2010",
        },
        {
          value: "2009",
          label: "2009",
        },
        {
          value: "2008",
          label: "2008",
        },
        {
          value: "2007",
          label: "2007",
        },
        {
          value: "2006",
          label: "2006",
        },
        {
          value: "2005",
          label: "2005",
        },
        {
          value: "2004",
          label: "2004",
        },
        {
          value: "2003",
          label: "2003",
        },
        {
          value: "2002",
          label: "2002",
        },
        {
          value: "2001",
          label: "2001",
        },
      ],
      inputHireYear: "",
    };
  },

  computed: {
    filterHireYear: {
      get() {
        return this.inputHireYear;
      },
      set(value) {
        this.inputHireYear = value;
      },
    },
  },
  watch: {
    //カテゴリー検索（入社年）の変更の監視
    filterHireYear: function() {
      this.$store.dispatch("filter/setFilterHireYear", this.inputHireYear);
    },
  },
  beforeDestroy() {
    this.$store.dispatch("filter/setFilterHireYear", "");
  },
};
</script>
<style>
#year:hover {
  cursor: pointer;
  border-color: #89c997;
}
</style>
