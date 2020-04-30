<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
      <div>
        <form>
          <fieldset>
            <legend>ユーザ登録</legend>
            <div>
              <label>名前:</label>
              <input />
            </div>
            <div>
              <label>メールアドレス:</label>
              <input />
            </div>
            <div>
              <div>
                入社年月:
                <select name="year">
                  <option value>-</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>年
                <select name="month">
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
              <input />
            </div>
            <div>
              <label>確認用パスワード:</label>
              <input />
            </div>
            <div>
              <label>部門:</label>
              <select>
                <option>-</option>
                <option>アプリエンジニア</option>
                <option>クラウドエンジニア</option>
                <option>機械学習エンジニア</option>
                <option>内勤</option>
              </select>
            </div>
            <div>
              <router-link to="/AdminHome">登録</router-link>
            </div>
            <v-btn color="info" @click="logout">戻る</v-btn>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   methods: {
        ...mapActions(['logout','deleteLoginUser'])
   },
}
</script>