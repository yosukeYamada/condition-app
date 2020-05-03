<template>
  <div>
    <DailyAggregate />
    <GraphDescription />
    <MonthlyAggregate />
  </div>
</template>

<script>
import MonthlyAggregate from "@/components/aggregate/MonthlyAggregate";
import DailyAggregate from "@/components/aggregate/DailyAggregate.vue";
import GraphDescription from "@/components/aggregate/GraphDescription.vue";

export default {
  components: {
    DailyAggregate,
    MonthlyAggregate,
    GraphDescription,
  },
};
</script>
