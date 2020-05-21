<template>
  <b-container fluid class="mt-5">
    <b-row align-v="center" align-h="center">
      <b-col sm="12" md="12" lg="10" xl="10">
        <div class="headline mb-4">マイコンディション履歴</div>
        <MyConditionList />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyConditionList from "@/components/my-condition/MyConditionList.vue";

export default {
  components: {
    MyConditionList,
  },
};
</script>
