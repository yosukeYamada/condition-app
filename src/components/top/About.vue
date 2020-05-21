<template>
  <b-col>
    <b-container>
      <b-row class="mb-5">
        <b-col class="text-center px-0 mb-5">
          <div class="body-2 font-weight-bold">Rakuppoとは</div>
          <hr class="mx-auto mt-1" />
          <div class="title font-weight-bold mb-4">
            コンディションを可視化する
          </div>
          <b-row align-h="center">
            <b-col lg="5" md="6" sm="8" cols="11">
              <img
                id="gif-img"
                style="object-fit: cover;width:100%;"
                src="/img/graph.gif"
                class="mx-auto img-fluid elevation-3 mb-5"
              />
            </b-col>
          </b-row>
          <p class="mx-auto">
            Rakuppoはリクルートとサイバーエージェントにより共同開発されたアプリケーション「Geppo」に強く感銘を受け、
            未経験エンジニアによって開発された社内向けコンディション可視化アプリケーションです。
          </p>
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col class="text-center px-0 mb-5">
          <div class="body-2 font-weight-bold">自分の状態を把握する</div>
          <hr class="mx-auto mt-1" />
          <div class="title font-weight-bold mb-4">
            自分のコンディションを振り返る
          </div>
          <b-row align-h="center">
            <b-col lg="5" md="6" sm="8" cols="11">
              <img
                src="/img/my_condition.png"
                class="mx-auto img-fluid elevation-3 mb-5"
                style="object-fit: contain;"
              />
            </b-col>
          </b-row>
          <p class="mx-auto mb-0">
            今日の自分のコンディションを天気で表した5段階で自己採点します。
          </p>
          <p class="mx-auto">
            コンディションについてこのアプリでは次の3つの観点から定義しました。
          </p>
          <ul class="list-unstyled">
            <li class="font-weight-bold">モチベーション</li>
            <li class="font-weight-bold">体調</li>
            <li class="font-weight-bold">目標へのイメージ</li>
          </ul>
          <div class="text-center">
            <p class="mx-auto">
              毎日いまの自分を採点することで、前日との違いなどを意識し、スコア改善のイメージを行うことができます。
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col class="text-center px-0 mb-5">
          <div class="body-2 font-weight-bold">従業員の状態を把握する</div>
          <hr class="mx-auto mt-1" />
          <div class="title font-weight-bold mb-4">
            社内のコンディションを俯瞰する
          </div>
          <b-row align-h="center">
            <b-col lg="5" md="6" sm="8" cols="11">
              <img
                src="/img/employee_list.png"
                class="mx-auto img-fluid elevation-3 mb-5"
              />
            </b-col>
          </b-row>
          <p class="mx-auto">
            管理者ユーザーは、従業員が登録したコンディションを閲覧することができます。
          </p>
          <p class="mx-auto">
            また、グラフによる分析で月単位の全体のスコア推移などを確認することができ、
            社内環境の改善や個人へのフォローのリソースにすることができます。
          </p>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
</template>
<style scoped>
hr {
  background: linear-gradient(to right, green, yellow);
  height: 2px;
  border: none;
  width: 200px;
}
p {
  max-width: 600px;
}
</style>
