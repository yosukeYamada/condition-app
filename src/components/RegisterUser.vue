<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
      <div>
        <form>
          <fieldset>
            <legend>ユーザ登録</legend>
            <div>
              <label>名前:</label>
              <input v-model="userName"/>
            </div>
            <div>
              <label>名前(かな):</label>
              <input v-model="userNameKana"/>
            </div>
            <div>
              <label>メールアドレス:</label>
              <input v-model="mailAddress"/>
            </div>
            <div>
              <div>
                入社年月:
                <select name="year" v-model="hireYear">
                  <option value>-</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>年
                <select name="month" v-model="hireMonth">
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
              <label>パスワード:</label>
              <input v-model="password"/>
            </div>
            <div>
              <label>確認用パスワード:</label>
              <input v-model="confirmationPassword"/>
            </div>
            <div>
              <label>部門:</label>
              <select v-model="depId">
                <option>-</option>
                <option value="1">アプリエンジニア</option>
                <option value="2">クラウドエンジニア</option>
                <option value="3">機械学習エンジニア</option>
                <option value="4">内勤</option>
              </select>
            </div>
            <div>
              <router-link to="/AdminHome">登録</router-link>
            </div>
          </fieldset>
        </form>
            <button v-on:click="apiTest()">APIテスト送信</button><br>
            <button v-on:click="registerUser()">登録</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name:"RegisterUser",
  data(){
    return{
      sampleData:"テストデータ",
      userName:null,
      userNameKana:null,
      mailAddress:null,
      hireYear:null,
      hireMonth:null,
      password:null,
      confirmationPassword:null,
      depId:null,
      authorityId:null
    }
  },
  methods:{
    apiTest(){
      console.log(this.sampleData)
      axios.post("/api/test",{testMessage:this.sampleData})
      .then(res=>{
        console.log(res.data)
      })
    },
    registerUser(){
      this.authorityId =1;
      axios.post("/api/user/registerUser",{
        userName:this.userName,
        userNameKana:this.userNameKana,
        depId:this.depId,
        hireYear:this.hireYear,
        hireMonth:this.hireMonth,
        mailAddress:this.mailAddress,
        password:this.password,
        confirmationPassword:this.confirmationPassword,
        authorityId:this.authorityId
      })
      .then(response=>{
        console.log(response)
        console.log(response.data)
      })
    }
  }
}
</script>