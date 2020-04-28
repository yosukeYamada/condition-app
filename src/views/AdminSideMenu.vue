<template>
  
    
    <div class="sideMenu">
      <b-sidebar id="sidebar-1" title="Menu" shadow>
        
        <!-- <Menubotton id="Menubutton1"></Menubotton> -->
        <AdminSideNav class="sideNav"></AdminSideNav>
      </b-sidebar>
    </div>

</template>

<script>

import AdminSideNav from "../components/AdminSideNav.vue";
// import Menubotton from "../components/Menubotton.vue";
export default {
  components: {
    AdminSideNav,
    // Menubotton,
  },
};
</script>

<style>
#sidebar-1{
    background:aquamarine;
}
.sideMenu{
    background:aquamarine;
    




    
}
.sideNav{
    background:aquamarine;
}



</style>
