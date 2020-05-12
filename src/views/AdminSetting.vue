<template>
  <b-col>
    <h2 class="mb-4">管理者設定</h2>
    <b-row>
      <AdminSetting />
    </b-row>
    <b-row>
      <NewsPostSetting />
    </b-row>
    <b-row>
      <Setting2 />
    </b-row>
    <img
      class="float-right"
      width="50"
      @click="rakuscal(rakuscalCount)"
      :src="rakuscalImage"
    />
  </b-col>
</template>

<script>
import AdminSetting from "@/components/admin-setting/AdminSetting";
import NewsPostSetting from "@/components/admin-setting/NewsPostSetting";
import Setting2 from "@/components/admin-setting/Setting2";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";

export default {
  components: {
    AdminSetting,
    NewsPostSetting,
    Setting2,
  },
  data() {
    return {
      rakuscalCount: 1,
      rakuscalImage:"/rakuscal.png"
    };
  },

  //リロード時にログインユーザー情報を保持する
  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  created() {
    // firebase.auth().setPersistance(firebase.auth.Auth.Persistance.SESSION);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/api/user/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.authority);
            this.$store.dispatch("setLoginUser", response.data);
          });
      }
    });
  },
  //これがないとfirabaseのユーザー情報をstateに格納できない
  methods: {
    ...mapActions(["setFirebaseUser"]),
    rakuscal(rakuscalCount) {
      if(rakuscalCount === 1){
        alert("ラクスカル「よくも見つけてくれたな！！！」");
        this.rakuscalCount++;
        
      }
      else if(rakuscalCount === 2){
        alert("ラクスカル「ひまなのかい・・・？」");
        this.rakuscalCount++;
      }
      else if(rakuscalCount === 3){
        alert("ラクスカル「勉強しいや〜」");
        this.rakuscalCount++;
      }
      else{
        alert("ラクスカル「もう話すことはないよ〜〜！」")
        this.rakuscalImage = "/rakuscal_clear.png"
      }
    },
  },
};
</script>
