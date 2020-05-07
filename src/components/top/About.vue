<template>
  <b-col>
    <v-card>
      <v-card-text class="mb-1" v-for="(item,i) in items" :key="i">
        <p class="title">{{ item.title }}</p>
        <p class="mb-1" v-for="(description, j) in item.descriptions" :key="j">{{ description }}</p>
      </v-card-text>
    </v-card>
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Rakkupoとは",
          descriptions: [
              "Rakuppoは、働く従業員が自らのコンディションを登録し管理するシステムです。",
              "コンディションについて、このアプリケーションでは3つの観点から定義しました。",
              "(1)モチベーション ",
              "(2)体調 ",
              "(3)目標へのイメージ ",
          ],
        },
        {
          title: "開発環境",
          descriptions: [
              "開発言語：Java(SpringBoot), JavaScript(Vue.js)",
              "実行環境：Firebase, Heroku, Heroku Postgres",
          ],
        },
      ],
    };
  },
};
</script>
