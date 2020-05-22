<template>
  <b-col>
    <v-card
      class="px-1"
      tile
      outlined
      style="border-width:4px; max-height:350px"
    >
      <v-card-text class="mt-2">
        <div class="headline font-weight-black mb-4">{{ title }}</div>
        <div class="information">
          <div v-for="(info, i) in informationList" :key="i" class="mb-2">
            <div class="pl-1 mb-1 font-weight-black">
              {{ info.informationDate | moment }}
            </div>
            <b-row align-v="center" class="px-4">
              <div
                class="px-2 mb-2 mt-1 pt-1 mr-4 name overline"
                :style="style"
              >
                {{ info.category.categoryName }}
              </div>
              <router-link
                :to="{
                  name: 'Information',
                  query: { info: encodeURIComponent(JSON.stringify(info)) },
                }"
                class="link gray--text"
              >
                <div class=" text-secondary">
                  {{ info.informationTitle }}
                </div>
              </router-link>
            </b-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </b-col>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Information",
      style: {
        backgroundColor: "#28A745",
        width: "98px",
        color: "white",
      },
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    },
  },
  computed: {
    informationList() {
      var informationList = [];
      for (let num in this.$store.state.informationList) {
        let information = this.$store.state.informationList[num];
        information.category = this.$store.state.categoryList.find(
          (category) => category.categoryId === information.categoryId
        );
        informationList.push(information);
      }
      return informationList;
    },
  },
  methods: {
    ...mapActions(["setInformation", "setCategoryList"]),
  },
  created() {
    axios.get("/information").then((response) => {
      this.setInformation(response.data.informationList);
      this.setCategoryList(response.data.category);
    });
  },
};
</script>

<style scoped>
.name {
  text-align: center;
}
.link {
  text-decoration: none;
}
.information {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
