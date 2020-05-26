<template>
  <b-modal id="news-post" ok-title="閉じる" ok-only centeredcentered title="お知らせの投稿">
    <ValidationObserver v-slot="{ invalid, passes }">
      <ValidationProvider rules="required" v-slot="{ errors }">
        <v-subheader>お知らせの追加</v-subheader>
        <small v-if="errors.length !== 0" class="px-3 text-danger">{{ errors[0] }}</small>
        <b-row align-v="center" class="px-3 mb-4">
          <b-col cols="12" sm="10" class="py-0 pb-1">
            <b-form-input v-model="inputNews" type="text" size="sm" placeholder="お知らせを追加" required></b-form-input>
          </b-col>
          <b-col sm="2">
            <b-button
              variant="outline-success"
              size="sm"
              :disabled="invalid"
              @click.prevent="passes(addNews)"
            >投稿</b-button>
          </b-col>
        </b-row>
      </ValidationProvider>
    </ValidationObserver>
    <v-divider></v-divider>
    <v-list two-line subheader>
      <v-subheader>お知らせ一覧</v-subheader>
      <div id="PostedNewsList">
        <v-list-item v-for="(newsPost, i) in newsPostList" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              {{
              newsPost.newsDate | moment
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
              newsPost.newsComment
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="deleteNewsPost(newsPost.newsId)" icon>
              <v-icon color="red darken-3">mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>
    </v-list>
  </b-modal>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      items: [],
      newsPostList: [],
      inputNews: ""
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    }
  },
  methods: {
    // お知らせの投稿
    addNews() {
      let isAdd = window.confirm(
        "「" + this.inputNews + "」をお知らせしますか？"
      );
      if (isAdd) {
        axios
          .post("/news", {
            userId: this.$store.state.loginUser.userId,
            newsComment: this.inputNews
          })
          .then(response => {
            this.$store.dispatch("setNewsPostList", response.data);
            this.newsPostList = this.$store.state.newsPostList;
            this.inputNews = "";
          })
          .catch(e => {
            alert("お知らせ投稿に失敗しました：" + e);
          });
        alert("お知らせを投稿しました！");
      }
    },
    // お知らせの削除
    deleteNewsPost(newsId) {
      let isAdd = window.confirm("削除しますか？");
      if (isAdd) {
        axios.post("/deleteNews", {
          userId: this.$store.state.loginUser.userId,
          newsId: newsId
        });
        // リアルタイム表示
        for (let i in this.newsPostList) {
          this.items = this.newsPostList[i];
          if (this.items.newsId === newsId) {
            let index = this.newsPostList.indexOf(this.items);
            this.newsPostList.splice(index, 1);
          }
        }
      }
    }
  },
  created() {
    this.newsPostList = this.$store.state.newsPostList;
  }
};
</script>

<style>
#PostedNewsList {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
