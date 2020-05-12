<template>
  <div class="jumbotron jumbotron-fluid bg-dark p-0">
    <div class="jumbotron-background"></div>
    <div class="container-fluid text-white text-center">
      <p class="display-2 mb-4">コンディションを管理しよう</p>
      <p class="lead">
        日々のコンディションをマネジメントするアプリケーション
      </p>
      <hr class="my-4" />
      <p>
        すでに利用しているユーザーはこちらからログインしてコンディションを登録しましょう
      </p>
      <b-button variant="success" @click="toPage('/')">ログインする</b-button>
    </div>
  </div>
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
.jumbotron .container-fluid {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
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
