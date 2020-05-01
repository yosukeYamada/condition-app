<template>
   <ConBarChart class="chart" :con-chart-data="ConChartData"></ConBarChart>

</template>

<script>
 import ConBarChart from "../components/ConBarChart.vue";
 import axios from "axios";
 export default{
     components:{
         ConBarChart

     },

     data(){
         return{
            //  isGetData: false,
             ConChartData:{
                 labels: ['January', 'February', 'March', 'April', 'May'],
                 datasets:[
                     {
              label: 'コンディション',
              data: [28, 20, 30, 40, 50],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                 ],
                 borderColor:[
                     'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'

                 ],
                 borderWidth: 1

                 
                     }
                 ]

         }
     }
 },

 mounted(){
     axios.get('http://localhost:8080/getAggregateByMonth?date=2020/04/27')
     .then((response)=>{
        //   console.log(response.data);
         (this.ConChartData.datasets[0].data = this.convertChartData(
             response.data
         ))
        //  this.isGetData = true;
     })
     .catch((e) =>{
         alert(e);
     });
     
     
 },
 methods:{
     convertChartData(responseData){
         console.log(typeof responseData)
         var dateArray =[]
        //  var scoreArray=[]
         for(let key in responseData){
        
             dateArray.push(key)
         }
         console.log(dateArray)

         responseData.map(elem=>{
             elem.key
         })
         



        //  var keys = responseData.keys();
        //  console.log(keys)

      
           
      

    //      var resultArray = [];
    //      resultArray.push(responseData.clearCount);
    //      resultArray.push(responseData.sunnyCount);
    //      resultArray.push(responseData.rainyCount);
    //      resultArray.push(responseData.rainyCount);
    //      resultArray.push(responseData.stormyCount);

    //      return resultArray;
    
     }

 }
 }

</script>