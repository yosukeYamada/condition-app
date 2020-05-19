<template>
  <el-input
    id="inputUserName"
    placeholder="名前"
    v-model="filterUserName"
    clearable
  >
  </el-input>
</template>
<script>
export default {
  data() {
    return {
      inputUserName: "",
    };
  },
  computed: {
    filterUserName: {
      get() {
        return this.inputUserName;
      },
      set(value) {
        this.inputUserName = value;
      },
    },
  },

  watch: {
    //ユーザー名前検索の監視
    filterUserName() {
      this.$store.dispatch("setFilterUserName", this.inputUserName);
    },
  },

  mounted() {
    this.$store.dispatch("setFilterUserName", this.inputUserName);
  },

  beforeDestroy() {
    this.$store.dispatch("setFilterUserName", "");
  },
};
</script>
<style>
#inputUserName {
  width: 54%;
}
#inputUserName:hover {
  width: 54%;
  cursor: pointer;
  border-color: #60eeff;
}
</style>
