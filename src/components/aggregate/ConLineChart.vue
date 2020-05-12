<script>
import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveData],
  props: ["conChartData", "options", "isGetData"],
  watch: {
    isGetData: function() {
      this.renderChart(this.conChartData, this.options);
    },
  },
  mounted() {
    this.renderChart(this.conChartData, this.options);
  },
};
</script>
