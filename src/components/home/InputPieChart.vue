<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData", "options", "isGetData"],
  watch: {
    isGetData: {
      handler: function() {
        this.renderChart(this.chartData, this.options);
      }
    },
  },
  mounted() {
    this.addPlugin({
      afterDraw(chart) {
        let ctx = chart.ctx;

          // 中央にテキスト表示
          let fontSize = 15;
          let fontStyle = "normal";
          let fontFamily = "Helvetica Neue";
          ctx.fillStyle = "#000";
          // eslint-disable-next-line no-undef
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // position(第二, 第三引数は適宜調整)
          ctx.fillText(
            "50.0%" ,
            chart.width / 2,
            chart.height / 2
          );

      }
    });
    this.renderChart(this.chartData, this.options);
  }
};
</script>