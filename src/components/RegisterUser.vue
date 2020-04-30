<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
      <div>
        <form>
          <fieldset>
            <legend>ユーザ登録</legend>
            <div>
              <label>名前:</label>
              <input type="text" v-model="name" placeholder="名前" />
            </div>
            <div>
              <label>ふりがな:</label>
              <input type="text" v-model="kana" placeholder="ふりがな" />
            </div>
            <div>
              <label>メールアドレス:</label>
              <input type="text" v-model="mail" placeholder="メールアドレス" />
            </div>
            <div>
              <div>
                入社年月:
                <select v-model="year">
                  <option value>-</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>年
                <select v-model="month">
                  <option value>-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select> 月
              </div>
            </div>
            <div>
              <label>部門:</label>
              <select v-model="dep">
                <option value>-</option>
                <option value="1">アプリエンジニア</option>
                <option value="2">クラウドエンジニア</option>
                <option value="3">機械学習エンジニア</option>
                <option value="4">内勤</option>
              </select>
            </div>
            <div>
              <v-btn @click="addUser">登録</v-btn>
            </div>
            <v-btn color="info" @click="logout">戻る</v-btn>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      kana: "",
      mail: "",
      year: "",
      month: "",
      dep: ""
    };
  },
  methods: {
    ...mapActions(["logout", "deleteLoginUser"]),
    addUser() {
      const params = {
        name: this.name,
        kana: this.kana,
        mail: this.mail,
        year: this.year,
        month: this.month,
        dep: this.dep
      };
      axios
        .post("http://localhost:8080/user/registerUser", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/EmployeeUser");
        });
    }
  }
};
</script>