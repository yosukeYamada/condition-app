<template>
  <b-col  lg="9" md="10" sm="12">
    <b-card
      border-variant="success"
      header="投稿されている更新情報の一覧"
      header-bg-variant="success"
      header-text-variant="white"
      style="border-width:2px;"
    >
      <b-card-text class="mt-2">
        <div v-if="informationList.length !== 0">
          <div v-for="(info, i) in informationList" :key="i" class="mb-2">
            <div class="pl-1 mb-1 font-weight-bold">
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
                  name: 'EditInformation',
                  query: { info: encodeURIComponent(JSON.stringify(info)) },
                }"
                class="link gray--text"
              >
                <div class="text-secondary">
                  {{ info.informationTitle }}
                </div>
              </router-link>
            </b-row>
          </div>
        </div>
        <div
          class="grey--text pl-1 mb-4 font-weight-black"
          v-if="informationList.length === 0"
        >
          現在お知らせはありません
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
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
</style>
