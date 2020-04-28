<template>
  <v-app>
    
      <div class="d-flex align-center">
        <Header />
      </div>
    

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style>

#adminside{
  margin :40% auto;

}
.b-sidebar{
  background-color: #66CC66; 
  
}

#header-fixed
{
    position: fixed;            /* ヘッダーの固定 */
    top: 0px;                   /* 位置(上0px) */
    left: 0px;                  /* 位置(右0px) */
    width: 100%;                /* 横幅100%*/
    height: 140px;              /* 縦幅140px */
}

#header { 
	background-color:#66CC66;     /* 背景色(黒) */
	padding:10px 0 20px;       /* 上10px、下20pxをあける */
	height:110px;              /* 縦の高さ110px */
	width:100%;                /* 横の幅を100% */
}




</style>
