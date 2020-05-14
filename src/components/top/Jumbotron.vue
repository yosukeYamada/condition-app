<template>
  <div class="jumbotron jumbotron-fluid bg-dark p-0">
    <div class="jumbotron-background"></div>
    <div class="container-fluid text-white text-center">
      <b-row class="justify-content-md-center align-items-center h-100">
        <b-col sm="6" lg="4">
          <p class="display-3 font-weight-bold text-white mb-5">Rakuppo</p>
          <p class="title mb-4">コンディションを管理しよう</p>
          <p class="body-2">
            すでに利用しているユーザーは<br>
            こちらからログインしてコンディションを登録しましょう
          </p>
          <b-button variant="success" @click="toPage('/')"
            >ログインする</b-button
          >
        </b-col>
        <b-col sm="6" lg="4">
          <img class="img-fluid" src="/img/pc_screen.png" />
        </b-col>
      </b-row>
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
  padding-top: 2rem;
  padding-bottom: 2rem;
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
