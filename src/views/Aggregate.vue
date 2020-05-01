<template>
  <div>
    <DailyAggregate />
    <MonthlyAggregate />
  </div>
</template>

<script>
import MonthlyAggregate from "@/components/aggregate/MonthlyAggregate";
import DailyAggregate from "@/components/aggregate/DailyAggregate.vue";

export default {
  components: {
    DailyAggregate,
    MonthlyAggregate,
  },
};
</script>
