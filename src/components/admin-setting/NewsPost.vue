<template>
  <b-modal id="news-post" centered title="お知らせの投稿">
    <v-subheader>
      <b-row>
        <b-col sm="10" class="pr-0 pb-1">
          <b-form-input
          v-model="param.inputNews"
            type="text"
            size="sm"
            placeholder="お知らせを追加"
            required
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="pb-1">
          <b-button size="sm" @click="addNews">投稿</b-button>
        </b-col>
      </b-row>
    </v-subheader>
  </b-modal>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      param:{
        newsId:"6",
        inputNews:""
      }
    };
  },
  methods:{
    addNews(){
      console.log(this.param.inputNews);
      let isAdd = window.confirm(
        this.param.inputNews + "をお知らせしますか？"
      );
      if (isAdd) {
      axios
        .post("/news", {
          userId: this.$store.state.loginUser.userId,
          newsId: this.param.newsId,
          newsComment: this.param.inputNews,
        })
        .then((response) => {
          this.$store.dispatch("setNewsPost", response.data);
        })
        .catch((e) => {
          alert("お知らせ投稿に失敗しました：" + e);
        });

      alert("お知らせを投稿しました！");
      }
    }
  }
}
</script>
