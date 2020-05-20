<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col lg="10">
        <b-card
          border-variant="success"
          style="border-width:1px;"
          class="mx-auto p-4 rounded-0"
          v-for="(info, i) in informationList"
          :key="i"
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      informationList: [],
    };
  },
  created() {
    this.setInfoDetailId(this.$route.params.informationId)

    var information = this.$store.state.information.filter(
      (elm) => elm.informationId === this.$store.state.infoDetail[0].informationId
    );
    
    this.setInfoDetail(information)
    this.informationList = this.$store.state.infoDetail
  },
  methods: {
    ...mapActions(['setInfoDetail','setInfoDetailId']),
    transferSentence(sentence) {
      return sentence.replace("\n", "<br>");
    },
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    },
  },
  beforeDestroy() {
    this.$store.dispatch("setInfoDetail", "");
  },
};
</script>
