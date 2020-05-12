<script>
import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveData],
  props: ["motivChartData", "options", "isGetData"],
  watch: {
    isGetData: function() {
      this.renderChart(this.motivChartData, this.options);
    },
  },
  mounted() {
    this.renderChart(this.motivChartData, this.options);
  },
};
</script>