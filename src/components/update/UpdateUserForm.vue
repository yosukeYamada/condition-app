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
                v-model="user.userName"
                maxlength="20"
                required
              />
              <small class="text-danger">{{ errors[0] }}</small>
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
                v-model="user.userNameKana"
                maxlength="20"
                required
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            :rules="{
              required: true,
              email: true,
              regex: /^[a-zA-Z0-9_.-]+@rakus-partners.co.jp|^[a-zA-Z0-9_.-]+@rakus.co.jp/,
            }"
          >
            <b-form-group label="メールアドレス" label-for="input-email">
              <b-form-input
                id="input-email"
                type="email"
                v-model="user.mailAddress"
                required
              />
              <small class="text-danger">{{ errors[0] }}</small>
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
                    <b-form-select name="year" v-model="user.hireYear" required>
                      <option disabled selected>年</option>
                      <option v-for="i in selectYears" :key="i" :value="i">
                        {{ i }}
                      </option>
                    </b-form-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider name="month" rules="required">
                    <b-form-select
                      name="month"
                      v-model="user.hireMonth"
                      required
                    >
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
                <b-form-select v-model="user.depId" required>
                  <option selected disabled>部門名を選択してください</option>
                  <option
                    v-for="(dep, i) in selectDeps"
                    :key="i"
                    :value="dep.depId"
                    >{{ dep.depName }}</option
                  >
                </b-form-select>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <b-button
            class="mr-3"
            variant="outline-success"
            :disabled="isPush"
            @click.prevent="handleSubmit(updateUser)"
            >更新</b-button
          >
        </b-card-text>
      </b-card>
    </ValidationObserver>
  </b-col>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "UpdateUserForm",
  data() {
    return {
      isPush: false,
      user: {},
      selectYears: [],
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
      if (this.user.hireYear === nowYear) {
        var nowMonth = now.getMonth() + 1;
        return nowMonth;
      }
      return 12;
    },
    selectDeps() {
      return this.$store.state.depList;
    },
    userQuery() {
      return JSON.parse(decodeURIComponent(this.$route.query.item));
    },
  },
  methods: {
    updateUser() {
      this.isPush = true;
      this.user.userName = this.user.userName.replace("　", "");
      this.user.userNameKana = this.user.userNameKana.replace("　", "");
      axios
        .post("/updateUser", {
          userId: this.user.userId,
          updateUserId: this.$store.state.loginUser.userId,
          userName: this.user.userName,
          userNameKana: this.user.userNameKana,
          depId: this.user.depId,
          hireYear: this.user.hireYear,
          hireMonth: this.user.hireMonth,
          mailAddress: this.user.mailAddress,
          version: this.user.version,
        })
        .then((response) => {
          if (response.data == "") {
            alert("他の管理者が更新しています");
          } else {
            this.$store.dispatch("setUpdateEmployee", response.data);
            alert("更新が完了しました！");
            this.$router.push("/UpdateUser");
          }
        })
        .catch((e) => {
          alert("ユーザー情報の更新の送信に失敗しました：" + e);
        });
    },
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
  },
  created() {
    this.makeYearList();
  },
  mounted() {
    this.user = this.userQuery;
    this.user.hireYear = moment(this.userQuery.hireDate).format("YYYY");
    this.user.hireMonth = moment(this.userQuery.hireDate).format("M");
    this.user.userNameKana = this.userQuery.kana;
    this.user.userName = this.userQuery.name;
    this.user.mailAddress = this.userQuery.mail;
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
