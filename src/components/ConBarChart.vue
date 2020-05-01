<script>
import { Bar } from 'vue-chartjs'

export default{
    extends: Bar,
    // props: ['ConBardata', 'options'],
    mounted (){
        this.renderChart(this.data,this.options)
    }


}


</script>