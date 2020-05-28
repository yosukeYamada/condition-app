<script>
import { Line, mixins } from "vue-chartjs";
import moment from "moment";
export default {
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["dailyPostList", "selectedMonth"],
  data() {
    return {
      chartData: {},
      options: {
        responsive: true,
        display: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: { fontSize: 10 },
        },
        scales: {
          yAxes: [
            //y軸
            {
              ticks: {
                //軸のメモリ
                beginAtZero: true, //0から始まる
                min: 0,
                max: 5
              },
              gridLines: {
                //y軸の網線
                display: true, //表示するか否か
              },
              scaleLabel: {
                //表示されるy軸の名称について
                display: true, //表示するか否か
                labelString: "スコア",
                fontSize: 12,
              },
            },
          ],
          xAxes: [
            //x軸
            {
              ticks: {
                autoSkip: true, //横幅が狭くなったときに表示を間引くか否か
                maxRotation: 90, //下のと合わせて表示される角度を決める
                minRoation: 90, //横幅を最小にしたときに縦に表示される
              },
              gridLines: {
                //x軸の網線
                display: false,
              },
              scaleLabel: {
                //表示されるx軸の名称について
                display: true,
                labelString: "日付",
                fontSize: 12,
              },
            },
          ],
        },
      },
    };
  },
  watch: {
    dailyPostList: async function() {
      await this.setChartData();
      this.renderChart(this.chartData, this.options);
    },
    selectedMonth: async function(newValue) {
      if (newValue) {
        await this.setChartData();
        this.renderChart(this.chartData, this.options);
      }
    },
  },
  methods: {
    setChartData() {
      var dailyPostList = Array.from(this.dailyPostList);
      /** 選択された月に該当するものだけ絞り込み */
      dailyPostList.filter((dailyPost) => {
        if (moment(this.selectedMonth).isSame(dailyPost.date, "month")) {
          return dailyPost;
        }
      });
      /** 降順になっているので昇順に並び替え */
      dailyPostList.reverse();
      /** 日付オブジェクトの配列を作成 */
      var dateArray = this.createDateArray();
      /** 投稿の内容を日付オブジェクトにスコアとして反映(該当するデータが1件もない場合は実行しない) */
      if (dailyPostList.length !== 0) {
        dateArray.forEach((dateObj) => {
          dailyPostList.forEach((dailyPost) => {
            if (moment(dateObj.date).isSame(dailyPost.date, "day")) {
              dateObj.motivationScore = this.transferScore(
                dailyPost.postedMotivation.motivation.motivationId
              );
              dateObj.conditionScore = this.transferScore(
                dailyPost.postedCondition.condition.conditionId
              );
              dateObj.performanceScore = this.transferScore(
                dailyPost.postedPerformance.performance.performanceId
              );
            }
          });
        });
      }
      /** x軸のラベルを作成 */
      var labels = dateArray.map((dailyPost) =>
        moment(dailyPost.date).format("MM-DD")
      );
      /** データをセット */
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "やる気",
            data: dateArray.map((dateObj) => dateObj.motivationScore),
            borderColor: "#f57c00",
            backgroundColor: "rgba(240,100,100,0.2)",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: "体調",
            data: dateArray.map((dateObj) => dateObj.conditionScore),
            backgroundColor: "rgba(92,184,92,0.2)",
            borderColor: "#356e4d",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: "成果",
            data: dateArray.map((dateObj) => dateObj.performanceScore),
            backgroundColor: "rgba(0,127,255,0.2)",
            borderColor: "#007fff",
            radius: 1,
            borderWidth: 1,
          },
        ],
      };
    },
    createDateArray() {
      const start = moment(this.selectedMonth).startOf("month");
      const end = moment(this.selectedMonth).endOf("month");
      let resultArray = [];
      while (start.unix() <= end.unix()) {
        resultArray.push({
          date: start.format("YYYY-MM-DD"),
          motivationScore: 0,
          conditionScore: 0,
          performanceScore: 0,
        });
        start.add(1, "days");
      }
      return resultArray;
    },
    transferScore(id) {
      if (id === 1) {
        return 5;
      } else if (id === 2) {
        return 4;
      } else if (id === 3) {
        return 3;
      } else if (id === 4) {
        return 2;
      } else if (id === 5) {
        return 1;
      }
    },
  },
  mounted() {
    if (this.dailyPostList.length !== 0) {
      this.setChartData();
      this.renderChart(this.chartData, this.options);
    }
  },
};
</script>