<template>
  <b-modal id="news-post" ok-title="閉じる" ok-only centeredcentered title="お知らせの投稿">
    <v-subheader>
      <b-row>
        <b-col sm="10" class="pr-0 pb-1">
          <b-form-input v-model="inputNews" type="text" size="sm" placeholder="お知らせを追加" required></b-form-input>
        </b-col>
        <b-col sm="2" class="pb-1">
          <b-button size="sm" @click="addNews">投稿</b-button>
        </b-col>
      </b-row>
    </v-subheader>

    <v-list two-line subheader>
      <v-subheader>お知らせ一覧</v-subheader>
      <v-list-item v-for="(newsPost, i) in newsPostList" :key="i" @click="vlistItemClick">
        <v-list-item-content>
          <v-list-item-title>{{ newsPost.newsDate | moment }}</v-list-item-title>
          <v-list-item-subtitle>{{ newsPost.newsComment }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="deleteNewsPost(newsPost)" icon>
            <v-icon color="red darken-3">mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </b-modal>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
    ...mapActions(["setNewsPost"]),
    addNews() {
      let isAdd = window.confirm(this.inputNews + "をお知らせしますか？");
      if (isAdd) {
        axios
          .post("/news", {
            userId: this.$store.state.loginUser.userId,
            newsComment: this.inputNews
          })
          .then(response => {
            this.$store.dispatch("setNewsPost", response.data);
          })
          .catch(e => {
            alert("お知らせ投稿に失敗しました：" + e);
          });

        alert("お知らせを投稿しました！");
      }
    },
    deleteNewsPost(newsPost) {
      alert("未開発");
      console.log(newsPost);
    },
    vlistItemClick() {
      /** コンソールエラー回避とUI機能の維持のため置いておく */
    }
  },
  created() {
    axios
      .get("/showNewsPostList")
      .then(response => {
        this.$store.dispatch("setNewsPost", response.data);
        this.newsPostList = this.$store.state.newsPost;
      })
      .catch(e => {
        alert("お知らせ一覧を取得するAPIとの通信に失敗しました:" + e);
      });
  }
};
</script>
