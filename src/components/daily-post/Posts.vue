<template>
  <div id="content">
    <b-card
      class="m-5 text-left"
      border-variant="success"
      style="border-width:2px;"
      title="今日のコンディション登録"
    >
      <b-card-text>
        <b-form>
          <b-form-group label="今日のモチベーションはどれくらいですか？">
            <b-form-radio-group class="mb-4" v-model="param.motivationSelected">
              <b-form-radio value="1">快晴</b-form-radio>
              <b-form-radio value="2">晴れ</b-form-radio>
              <b-form-radio value="3">曇り</b-form-radio>
              <b-form-radio value="4">雨</b-form-radio>
              <b-form-radio value="5">嵐</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="今日の体調はどうですか？">
            <b-form-radio-group class="mb-4" v-model="param.conditionSelected">
              <b-form-radio value="1">快晴</b-form-radio>
              <b-form-radio value="2">晴れ</b-form-radio>
              <b-form-radio value="3">曇り</b-form-radio>
              <b-form-radio value="4">雨</b-form-radio>
              <b-form-radio value="5">嵐</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="今日やることの目標のイメージはできていますか？">
            <b-form-radio-group
              class="mb-4"
              v-model="param.performanceSelected"
            >
              <b-form-radio value="1">快晴</b-form-radio>
              <b-form-radio value="2">晴れ</b-form-radio>
              <b-form-radio value="3">曇り</b-form-radio>
              <b-form-radio value="4">雨</b-form-radio>
              <b-form-radio value="5">嵐</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="なにかコメントはありますか？"
            label-for="input-comment"
          >
            <b-form-textarea
              id="input-comment"
              v-model="param.comment"
              placeholder="コメントがあれば入力してください"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-button variant="outline-success" @click.prevent="register()"
            >登録する</b-button
          >
        </b-form>
        {{ param }}
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      param: {
        motivationSelected: "",
        performanceSelected: "",
        conditionSelected: "",
        comment: "",
        // TODO あとログインユーザーのID情報がいる
      },
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8080/registerDailyPost", {
          userId: "3", // TODO とりあえず開発用で固定
          motivationId: this.param.motivationSelected,
          conditionId: this.param.conditionSelected,
          performanceId: this.param.performanceSelected,
          comment: this.param.comment,
        })
        .then((response) => {
          console.log("コンディション情報の登録に成功しました：" + response);
        })
        .catch((e) => {
          alert("コンディション登録の送信に失敗しました：" + e);
        });
      alert("登録しました！");
    },
  },
};
</script>
