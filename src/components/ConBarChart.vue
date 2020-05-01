<script>
import { Bar } from 'vue-chartjs'

export default{
    extends: Bar,
    props: ['ConChartData', 'options','isGetData'],
    watch: {
    isGetData: function() {
      this.renderChart(this.ConChartData, this.options);
    },
  },
    mounted (){
        this.renderChart(this.ConChartData,this.options)
    }


}


</script>