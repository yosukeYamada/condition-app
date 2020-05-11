<template>
  <b-col>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-card
        class="text-left"
        border-variant="success"
        header="ユーザー登録"
        header-bg-variant="success"
        header-text-variant="white"
        style="border-width:2px;"
      >
        <b-card-text>
          <p class="mb-0">あなたはまだユーザー登録が完了していません。</p>
          <p>Rakuppoを利用するにはユーザー登録を完了してください。</p>
        </b-card-text>
        <b-card-text>
          <ValidationProvider :rules="{userName: /[^ -~｡-ﾟ]{1,20}/}" v-slot="{errors}">
            <b-form-group label="名前" label-for="input-name" description="苗字と名前の間はスペースをあけないでください">
              <b-form-input id="input-name" type="text" v-model="userName" placeholder="ラクス太郎" />
              <p>{{errors[0]}}</p>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider :rules="{userNameKana: /[ぁ-ん]{1,20}/}" v-slot="{errors}">
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
              <div>{{errors[0]}}</div>
            </b-form-group>
          </ValidationProvider>
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
              disabled="disabled"
            />
          </b-form-group>
          <ValidationObserver>
            <b-form-group label="入社年月">
              <b-row>
                <b-col>
                  <ValidationProvider
                    rules="checkRequiredHireMonthYear|hireMonthYear:@month"
                    v-slot="{errors}"
                  >
                    <b-form-select name="year" v-model="hireYear">
                      <option disabled selected>年</option>
                      <option v-for="i in selectYears" :key="i" :value="i">
                        {{
                        i
                        }}
                      </option>
                    </b-form-select>
                    <p>{{errors[0]}}</p>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider name="month" rules="required">
                    <b-form-select name="month" v-model="hireMonth">
                      <option disabled selected>月</option>
                      <option v-for="i in 12" :key="i" :value="i">{{ i }}</option>
                    </b-form-select>
                  </ValidationProvider>
                </b-col>
              </b-row>
            </b-form-group>
          </ValidationObserver>
          <div>
            <ValidationProvider rules="required" v-slot="{errors}">
              <b-form-group label="部門">
                <b-form-select v-model="depId">
                  <option value="null" disabled>部門名を選択してください</option>
                  <option v-for="(dep, i) in selectDeps" :key="i" :value="dep.value">{{ dep.name }}</option>
                </b-form-select>
              </b-form-group>
              <p>{{errors[0]}}</p>
            </ValidationProvider>
          </div>
          <b-button
            class="mr-3"
            variant="outline-success"
            @click.prevent="handleSubmit(registerUser)"
          >登録</b-button>
          <b-button variant="outline-danger" @click.prevent="resetButton()">リセット</b-button>
        </b-card-text>
      </b-card>
    </ValidationObserver>
  </b-col>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex"
export default {
  name: "RegisterUser",
  data() {
    return {
      selectYears: [2016, 2017, 2018, 2019, 2020],
      selectDeps: [
        {
          name: "アプリエンジニア",
          value: 1
        },
        {
          name: "クラウドエンジニア",
          value: 2
        },
        {
          name: "機械学習エンジニア",
          value: 3
        },
        {
          name: "内勤",
          value: 4
        }
      ],
      userName: null,
      userNameKana: null,
      mailAddress: null,
      hireYear: null,
      hireMonth: null,
      depId: null
    };
  },
  methods: {
    registerUser() {
      axios
        .post("/api/user/registerUser", {
          userName: this.userName,
          userNameKana: this.userNameKana,
          depId: this.depId,
          hireYear: this.hireYear,
          hireMonth: this.hireMonth,
          mailAddress: this.mailAddress,
          authorityId: 2
        })
        .then(response =>{
          this.setLoginUser(response.data);
              //authorityの値をstateに格納
              this.$store.dispatch(
                "setAuthority",
                response.data.authority);
              this.loginStatus();
              this.$router.push("/Home");
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
    ...mapActions([
      "setLoginUser",
      "login_status"
    ]),
  },
  mounted() {
    this.mailAddress = this.$store.state.loginUser.mailList[0].mailName;
  }
};
</script>