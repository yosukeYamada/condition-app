<template>
  <b-container fluid class="mt-5">
    <b-row align-v="center" align-h="center">
      <b-col xl="11" lg="11">
        <div class="headline mb-4">集計グラフ</div>
        <b-row>
          <b-col xl="3" lg="3" md="4" sm="4" class="pb-0">
            <el-date-picker
              v-model="selectedDate"
              type="date"
              placeholder="日付を選択"
              class="w-100"
            >
            </el-date-picker>
          </b-col>
          <b-col xl="3" lg="3" md="4" sm="4">
            <SearchByDep />
          </b-col>
          <b-col xl="1" lg="2" md="3" sm="2">
            <SearchButton />
          </b-col>
        </b-row>
        <small
          >※
          指定した日付に該当するデータが存在しない場合はグラフは描画されません</small
        >
        <DailyAggregate />
        <GraphDescription />
        <MonthlyAggregate />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MonthlyAggregate from "@/components/aggregate/MonthlyAggregate";
import DailyAggregate from "@/components/aggregate/DailyAggregate.vue";
import GraphDescription from "@/components/aggregate/GraphDescription.vue";
import SearchByDep from "@/components/aggregate/SearchByDep.vue";
import SearchButton from "@/components/aggregate/SearchButton.vue";
import moment from "moment";

export default {
  components: {
    DailyAggregate,
    MonthlyAggregate,
    GraphDescription,
    SearchByDep,
    SearchButton,
  },
  data() {
    return {
      selectedDate: String,
    };
  },
  created() {
    this.selectedDate = new Date().toISOString().substr(0, 10);
    this.$store.dispatch("aggregate/setSeletedDate", this.selectedDate);
  },
  computed: {
    selectDate: {
      get() {
        return moment(this.selectedDate).format("YYYY-MM-DD");
      },
      set(val) {
        this.selectedDate = val;
      },
    },
  },
  watch: {
    selectDate: function(newSelectedDate) {
      this.$store.dispatch("aggregate/setSeletedDate", newSelectedDate);
    },
  },
  beforeDestroy() {
    this.$store.dispatch("aggregate/setSeletedDate", "");
  },
};
</script>
