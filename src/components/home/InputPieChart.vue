<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveData],
  props: ["inputChartData", "options", "isGetData"],
  watch: {
    isGetData: function() {
      this.renderChart(this.inputChartData, this.options);
      this.drawInputRate();
    },
  },
  methods: {
    drawInputRate() {
      this.addPlugin({
        afterDraw(chart) {
          let inputDataArray = chart.data.datasets[0].data;
          let total = inputDataArray[0] + inputDataArray[1];
          let inputRate = ((inputDataArray[0] / total) * 100).toFixed(1);
          if (isNaN(inputRate)) {
            inputRate = 100;
          }
          let ctx = chart.ctx;
          // 中央にテキスト表示
          let fontSize = 35;
          let fontStyle = "normal";
          let fontFamily = "Helvetica Neue";
          ctx.fillStyle = "#000";
          // eslint-disable-next-line no-undef
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // 入力率の表示(第二, 第三引数は適宜調整)
          ctx.fillText(inputRate + "%", chart.width / 2, chart.height / 2);
        },
      });
    },
  },
  mounted() {
    this.drawInputRate();
    this.renderChart(this.inputChartData, this.options);
  },
};
</script>
