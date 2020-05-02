<template>
 <b-col>
    <b-card class="m-5" border-variant="success" 
      header="モチベーション履歴"
      header-bg-variant="success"
      header-text-variant="white"
    style="border-width:2px;">
      <Motivations />
    </b-card>
 </b-col>
</template>

<script>
import Motivations from "../components/Motivations.vue";

export default {
  components: {
    Motivations,
  }
};
</script>