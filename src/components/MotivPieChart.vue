<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["MotivChartData", "isGetData"],
 watch: {
    isGetData: function() {
      this.renderChart(this.MotivChartData, this.options);
    },
  },


  data() {
    return {
      options: {
        responsive: true,
        legend: {
          position: "left",
          labels: {
            fontSize: 15,
          },
        },
      },
    };
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

          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          // position(第二, 第三引数は適宜調整)
          ctx.fillText(
            "本日のモチベーション",
            chart.width / 2 - 30,
            chart.height / 2
          );

          let meta = chart.getDatasetMeta(i);

          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // フォントの設定
              let fontSize = 14;
              let fontStyle = "normal";
              let fontFamily = "Helvetica Neue";
              ctx.fillStyle = "#000";
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

              // 凡例の位置調整
              let legend = chart.legend;
              legend.top = chart.height - legend.height / 2 - legend.top / 2;
            });
          }
        });
      },
    });

    this.renderChart(this.MotivChartData, this.options);
    console.log("Motiv");
  },
};
</script>


