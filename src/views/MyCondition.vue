<template>
  <b-col>
    <h2 class="mb-4">モチベーション履歴</h2>
    <MyConditionList />
  </b-col>
</template>

<script>
import MyConditionList from "@/components/my-condition/MyConditionList.vue";

export default {
  components: {
    MyConditionList,
  },
};
</script>
