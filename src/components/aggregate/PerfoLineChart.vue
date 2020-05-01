<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["perfoChartData", "options", "isGetData"],
  watch: {
    isGetData: function() {
      this.renderChart(this.perfoChartData, this.options);
    },
  },
  mounted() {
    this.renderChart(this.perfoChartData, this.options);
  },
};
</script>