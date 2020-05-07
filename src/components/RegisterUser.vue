<template>
  <b-col>
    <b-card
      class="text-left"
      border-variant="success"
      header="ユーザー登録"
      header-bg-variant="success"
      header-text-variant="white"
      style="border-width:2px;"
    >
      <b-card-text>
        <p class="mb-0">
          あなたはまだユーザー登録が完了していません。
        </p>
        <p>
          Rakuppoを利用するにはユーザー登録を完了してください。
        </p>
      </b-card-text>
      <b-card-text>
        <b-form-group
          label="名前"
          label-for="input-name"
          description="苗字と名前の間はスペースをあけないでください"
        >
          <b-form-input
            id="input-name"
            type="text"
            v-model="userName"
            placeholder="ラクス太郎"
          />
        </b-form-group>
        <b-form-group
          label="ふりがな"
          label-for="input-name-kana"
          description="苗字と名前の間はスペースをあけないでください"
        >
          <b-form-input
            id="input-name-kana"
            type="text"
            v-model="userNameKana"
            placeholder="らくすたろう"
          />
        </b-form-group>
        <b-form-group
          label="メールアドレス"
          label-for="input-email"
          description="ログイン時に入力したメールアドレスを入力してください"
        >
          <b-form-input
            id="input-email"
            type="email"
            v-model="mailAddress"
            placeholder="taro.rakus@rakus-partners.co.jp"
          />
        </b-form-group>
        <b-form-group label="入社年月">
          <b-row>
            <b-col>
              <b-form-select name="year" v-model="hireYear">
                <option value="null" disabled>年</option>
                <option v-for="i in selectYears" :key="i" :value="i">{{
                  i
                }}</option>
              </b-form-select>
            </b-col>
            <b-col>
              <b-form-select name="month" v-model="hireMonth">
                <option value="null" disabled>月</option>
                <option v-for="i in 12" :key="i" :value="i">{{ i }}</option>
              </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>
        <div>
          <b-form-group label="部門">
            <b-form-select v-model="depId">
              <option value="null" disabled>部門名を選択してください</option>
              <option
                v-for="(dep, i) in selectDeps"
                :key="i"
                :value="dep.value"
                >{{ dep.name }}</option
              >
            </b-form-select>
          </b-form-group>
        </div>
        <b-button
          class="mr-3"
          variant="outline-success"
          @click.prevent="registerUser()"
          >登録</b-button
        >
        <b-button variant="outline-danger" @click.prevent="resetButton()"
          >リセット</b-button
        >
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterUser",
  data() {
    return {
      selectYears: [2016, 2017, 2018, 2019, 2020],
      selectDeps: [
        {
          name: "アプリエンジニア",
          value: 1,
        },
        {
          name: "クラウドエンジニア",
          value: 2,
        },
        {
          name: "機械学習エンジニア",
          value: 3,
        },
        {
          name: "内勤",
          value: 4,
        },
      ],
      userName: "",
      userNameKana: "",
      mailAddress: "",
      hireYear: null,
      hireMonth: null,
      depId: null,
    };
  },
  methods: {
    registerUser() {
          axios.post("/api/user/registerUser",{
          userName: this.userName,
          userNameKana: this.userNameKana,
          depId: this.depId,
          hireYear: this.hireYear,
          hireMonth: this.hireMonth,
          mailAddress: this.mailAddress,
          authorityId: 1,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.$router.push("/AdminHome");
        });
    },
    resetButton() {
      this.userName = "";
      this.userNameKana = "";
      this.mailAddress = "";
      this.hireYear = null;
      this.hireMonth = null;
      this.depId = null;
    },
  },
  mounted() {
    this.mailAddress = this.$store.state.mail;
  },
};
</script>
