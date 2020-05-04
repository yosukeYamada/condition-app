<template>
    <div>
    <h2>HOME画面(従業員)</h2>
    <b-row>
      <b-col sm="8">
        <Infomation />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Infomation from "@/components/home/Infomation";
export default {
  components: {
    Infomation
  },
};
</script>