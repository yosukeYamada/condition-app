<template>
  <b-card
    border-variant="success"
    style="border-width:1px;"
    class="mx-auto p-4 rounded-0"
  >
    <b-card-text>
      
      <b-col 
        xl="3" lg="3" md="4" sm="4" 
        class="border border-success text-success py-2 px-4 d-inline caption font-weight-bold">
        {{ info.informationDate | moment }}
      </b-col>

      <router-link
        :to="{
          name: 'PostEditedInformation',
          query: { info: encodeURIComponent(JSON.stringify(info)) },
        }"
        class="link gray--text"
      >
      <b-col 
        xl="3" lg="3" md="4" sm="4" 
        v-if="this.$store.state.loginStatus"
        class="border border-success py-2 px-4 d-inline caption font-weight-bold"
      >
        編集
      </b-col>
      </router-link>

      <b-col 
        xl="3" lg="3" md="4" sm="4" 
        v-if="this.$store.state.loginStatus"
        class="border border-success py-2 px-4 d-inline caption font-weight-bold delete"
        @click="del()"
      >
        削除
      </b-col>

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
import axios from "axios";
import Status from "@/assets/js/Status";
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
  methods: {
    del() {
      if (confirm("削除してよろしいですか？")) {
        axios.post('/info/delete', {
          informationId: this.info.informationId,
          status: Status.DELETED,
          version: this.info.version,
          updateUserId : this.$store.state.loginUser.userId
        }).then((response) => {
          if(response.data === Status.HOLD) {
            alert(
              "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
            );
          } else {
            alert('削除しました')
            this.$router.push('/editInformation')
          }
        })
      }
    }
  },
};
</script>

<style scoped>
 .delete:hover {
   cursor: pointer;
 }
</style>