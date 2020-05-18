<template>
<div>
<v-card
    class="mx-auto"
    max-width="800"
    v-for="(info,i) in information" :key="i"
  >
    <v-card-text>
      <div>{{ info.informationDate | moment }}</div>
      <p class="display-1 text--primary">
        {{ info.informationTitle }}
      </p>
      <p>内容</p>
      <div class="text--primary">
        {{ info.informationContent }}
      </div>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      information:[]
    }
  },
  created() {
    this.information = this.$store.state.information.filter(
      (elm) => elm.informationId === this.$route.params.informationId
    )
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  },
}
</script>