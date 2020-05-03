<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["PerfoChartData", "options", "isGetData"],
  watch: {
    isGetData: function() {
      this.renderChart(this.PerfoChartData, this.options);
    },
  },
  mounted() {
    this.addPlugin({
      afterDraw(chart) {
        let ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          let dataSum = 0;
          dataset.data.forEach((element) => {
            dataSum += element;
          });

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
            "本日のパフォーマンス",
            chart.width / 2,
            chart.height / 2
          );
          let meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // フォントの設定
              let fontSize = 14;
              let fontStyle = "normal";
              let fontFamily = "Helvetica Neue";
              ctx.fillStyle = "#FFFFFF";
              // 設定を適用
              // eslint-disable-next-line no-undef
              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );
              // ラベルをパーセント表示に変更
              let labelString = chart.data.labels[index];
              let dataString =
                Math.round((dataset.data[index] / dataSum) * 100).toString() +
                "%";

              // positionの設定
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              let padding = -2;
              let position = element.tooltipPosition();
              // ツールチップに変更内容を表示
              ctx.fillText(
                labelString,
                position.x,
                position.y - fontSize / 2 - padding
              ); // title
              ctx.fillText(
                dataString,
                position.x,
                position.y + fontSize / 2 - padding
              ); // データの百分率
            });
          }
        });
      },
    });
    this.renderChart(this.PerfoChartData, this.options);
  },
};
</script>
