<template>
  <b-col>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-card
        class="text-left"
        border-variant="success"
        header="ユーザー情報の更新"
        header-bg-variant="success"
        header-text-variant="white"
        style="border-width:2px;"
      >
        <b-card-text>
          <ValidationProvider
            :rules="{ userName: /([^ -~｡-ﾟ])/ }"
            v-slot="{ errors }"
          >
            <b-form-group
              label="名前"
              label-for="input-name"
              description="苗字と名前の間はスペースをあけないでください"
            >
              <b-form-input
                id="input-name"
                type="text"
                v-model="userName"
                maxlength="20"
                required
              />
              <p>{{ errors[0] }}</p>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            :rules="{ userNameKana: /[ぁ-ん]/ }"
            v-slot="{ errors }"
          >
            <b-form-group
              label="ふりがな"
              label-for="input-name-kana"
              description="苗字と名前の間はスペースをあけないでください"
            >
              <b-form-input
                id="input-name-kana"
                type="text"
                v-model="userNameKana"
                maxlength="20"
                required
              />
              <div>{{ errors[0] }}</div>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <b-form-group label="メールアドレス" label-for="input-email">
              <b-form-input
                id="input-email"
                type="email"
                v-model="mailAddress"
                required
              />
              <div>{{ errors[0] }}</div>
            </b-form-group>
          </ValidationProvider>
          <ValidationObserver>
            <b-form-group label="入社年月">
              <b-row>
                <b-col>
                  <ValidationProvider
                    rules="checkRequiredHireMonthYear|hireMonthYear:@month"
                    v-slot="{ errors }"
                  >
                    <b-form-select name="year" v-model="hireYear" required>
                      <option disabled selected>年</option>
                      <option v-for="i in selectYears" :key="i" :value="i">
                        {{ i }}
                      </option>
                    </b-form-select>
                    <p>{{ errors[0] }}</p>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider name="month" rules="required">
                    <b-form-select name="month" v-model="hireMonth" required>
                      <option disabled selected>月</option>
                      <option v-for="i in hireMonthList" :key="i" :value="i">{{
                        i
                      }}</option>
                    </b-form-select>
                  </ValidationProvider>
                </b-col>
              </b-row>
            </b-form-group>
          </ValidationObserver>
          <div>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group label="部門">
                <b-form-select v-model="depId" required>
                  <option selected disabled>部門名を選択してください</option>
                  <option
                    v-for="(dep, i) in selectDeps"
                    :key="i"
                    :value="dep.depId"
                    >{{ dep.depName }}</option
                  >
                </b-form-select>
              </b-form-group>
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
          <b-button
            class="mr-3"
            variant="outline-success"
            @click.prevent="handleSubmit(updateUser)"
            >更新</b-button
          >
          <b-button variant="outline-danger" @click.prevent="resetButton()"
            >リセット</b-button
          >
        </b-card-text>
      </b-card>
    </ValidationObserver>
  </b-col>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "UpdateUserForm",
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
      userName: null,
      userNameKana: null,
      mailAddress: null,
      hireYear: null,
      hireMonth: null,
      depId: null,
      userId: null,
      updateUserId: null,
      version: null,
    };
  },
  computed: {
    hireMonthList() {
      var now = new Date();
      var nowYear = now.getFullYear();
      if (this.hireYear === nowYear) {
        var nowMonth = now.getMonth() + 1;
        return nowMonth;
      }
      return 12;
    },
  },
  created() {
    this.makeYearList();
    this.makeDepList();
  },
  methods: {
    updateUser() {
      this.userName = this.userName.replace("　", "");
      this.userNameKana = this.userNameKana.replace("　", "");
      axios
        .post("/updateUser", {
          userId: this.userId,
          updateUserId: this.updateUserId,
          userName: this.userName,
          userNameKana: this.userNameKana,
          depId: this.depId,
          hireYear: this.hireYear,
          hireMonth: this.hireMonth,
          mailAddress: this.mailAddress,
          version: this.version,
        })
        .then((response) => {
          if (response.data == "null") {
            alert("他の管理者が更新しています");
          } else {
            this.$store.dispatch("setEmployeeList", response.data);
            alert("更新が完了しました！");
            this.$router.push("/UpdateUser");
          }
        })
        .catch((e) => {
          alert("ユーザー情報の更新の送信に失敗しました：" + e);
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
    ...mapActions(["setLoginUser", "loginStatus"]),
    makeYearList() {
      var now = new Date();
      var nowYear = now.getFullYear();
      var startYear = 2000;
      var yearList = [];
      for (var i = startYear; i <= nowYear; i++) {
        yearList.push(i);
      }
      this.selectYears = yearList;
    },
    makeDepList() {
      var depList = [];
      depList = this.$store.state.depList;
      this.selectDeps = depList;
    },
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.userName = this.$route.params.name;
    this.userNameKana = this.$route.params.kana;
    this.mailAddress = this.$route.params.mail;
    this.depId = this.$route.params.depId;
    this.hireYear = moment(this.$route.params.hireDate).format("YYYY");
    this.hireMonth = moment(this.$route.params.hireDate).format("M");
    this.updateUserId = this.$store.state.loginUser.userId;
    this.version = this.$route.params.version;
  },
};
</script>

<style scoped>
/* 入力エラーのスタイル */
input[type="text"]:invalid,
input[type="email"]:required,
input[type="email"]:invalid,
select:required {
  color: #630015;
  background-color: #ffd9e1;
}

/* 入力値が正常な時のスタイル */
input[type="text"]:valid,
input[type="email"]:valid,
select:valid,
textarea:valid {
  color: #333;
  border-color: #ccc;
  background: #fff;
}
</style>
