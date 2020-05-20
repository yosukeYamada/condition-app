<template>
  <el-select
    id="mouth"
    v-model="filterHireMonth"
    clearable
    placeholder="入社した月"
  >
    <el-option
      v-for="month in hireMonth"
      :key="month.value"
      :label="month.label"
      :value="month.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      hireMonth: [
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
        {
          value: 5,
          label: 5,
        },
        {
          value: 6,
          label: 6,
        },
        {
          value: 7,
          label: 7,
        },
        {
          value: 8,
          label: 8,
        },
        {
          value: 9,
          label: 9,
        },
        {
          value: 10,
          label: 10,
        },
        {
          value: 11,
          label: 11,
        },
        {
          value: 12,
          label: 12,
        },
      ],
      inputHireMonth: "",
    };
  },
  computed: {
    filterHireMonth: {
      get() {
        return this.inputHireMonth;
      },
      set(value) {
        this.inputHireMonth = value;
      },
    },
  },
  watch: {
    //カテゴリー検索（入社月）の変更の監視
    filterHireMonth() {
      this.$store.dispatch("setFilterHireMonth", this.inputHireMonth);
    },
  },
  mounted() {
    this.$store.dispatch("setFilterHireMonth", this.inputHireMonth);
  },
  beforeDestroy() {
    this.$store.dispatch("setFilterHireMonth", "");
  },
};
</script>
<style>
#mouth:hover {
  cursor: pointer;
  border-color: #60eeff;
}
</style>
