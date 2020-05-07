<template>
  <div class="jumbotron jumbotron-fluid bg-dark py-0">
    <div class="jumbotron-background"></div>
    <div class="container text-white">
      <h1 class="display-2 mb-4">コンディションを管理しよう</h1>
      <p class="lead">
        Rakuppoは自身の日々のコンディションを登録してマネジメントするアプリケーションです
      </p>
      <hr class="my-4" />
      <p>
        すでに利用しているユーザーはこちらからログインしてコンディションを登録しましょう
      </p>
      <b-button class="btn-primary btn-lg text-white" href="#" @click="toPage('/')" role="button"
        >ログインする</b-button
      >
    </div>
  </div>
  <!-- <b-jumbotron
    fluid
    header="Rakuppo"
    lead="コンディションをマネジメントするシステム"
  >
    <p>ユーザーの方はログインしてコンディションを記録しましょう</p>
    <b-button variant="primary" @click="toPage('/')">ログインする</b-button>
  </b-jumbotron> -->
</template>
<script>
export default {
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style>
.jumbotron {
  position: relative;
  overflow: hidden;
}
.jumbotron .container {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  padding: 5rem;
}
.jumbotron-background {
  object-fit: fill;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-image: url("/jumbotron-image.png");
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: right bottom;
}
</style>
