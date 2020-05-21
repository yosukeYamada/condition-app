<template>
  <b-card
    border-variant="success"
    style="border-width:1px;"
    class="mx-auto p-4 rounded-0"
  >
    <b-card-text>
      <div
        class="border border-success text-success py-2 px-4 d-inline caption font-weight-bold"
      >
        {{ info.informationDate | moment }}
      </div>
      <p class="headline font-weight-bold py-5 my-5">
        {{ info.informationTitle }}
      </p>
      <p style="white-space:pre-wrap;" class="body-2">
        {{ info.informationContent }}
      </p>
    </b-card-text>
  </b-card>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    info() {
      return JSON.parse(decodeURIComponent(this.$route.query.info));
    },
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    },
  },
};
</script>
