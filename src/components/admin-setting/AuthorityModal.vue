<template>
  <b-modal id="authority-modal" centered title="管理者権限の付与・削除">
    <v-subheader>
      <b-row>
        <b-col sm="10" class="pr-0 pb-1">
          <b-form-input
            v-model="inputEmail"
            type="email"
            size="sm"
            placeholder="メールアドレスで管理者を追加"
            required
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="pb-1">
          <b-button size="sm" @click="addAdminAuthority">追加</b-button>
        </b-col>
      </b-row>
    </v-subheader>
    <v-list two-line subheader>
      <v-subheader>管理者ユーザーの一覧</v-subheader>
      <v-list-item
        v-for="(admin, i) in adminList"
        :key="i"
        @click="vlistItemClick"
      >
        <v-list-item-content>
          <v-list-item-title v-text="admin.name"></v-list-item-title>
          <v-list-item-subtitle v-text="admin.email"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="deleteAdminAuthority(admin)" icon>
            <v-icon color="red darken-3">mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </b-modal>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      inputEmail: "",
      adminList: [],
    };
  },
  methods: {
    setAdminList() {
      let adminList = this.$store.state.employeeList.filter(
        (employee) => employee.authority === 1
      );
      this.adminList = adminList.map((employee) => {
        try {
          return {
            name: employee.userName,
            email: employee.mailList[0].mailName,
          };
        } catch (error) {
          console.error(error);
          return {
            name: employee.userName,
            email: "",
          };
        }
      });
    },
    addAdminAuthority() {
      let isAdd = window.confirm(
        this.inputEmail + "を管理者ユーザーに追加しますか？"
      );
      if (isAdd) {
        axios
          .post("/changeAuthority", {
            email: this.inputEmail,
            authority: 1,
            updateUserId: this.$store.state.loginUser.userId,
          })
          .then((response) => {
            console.log(response.data);
            alert(response.data.name + "さんに管理者権限を付与しました");
            this.adminList.push({
              name: response.data.name,
              email: response.data.email,
            });
            this.inputEmail = "";
          })
          .catch(() => alert("管理者権限の付与に失敗しました"));
      }
    },
    deleteAdminAuthority(admin) {
      let isDelete = window.confirm(
        admin.name + "さんを管理者ユーザーから削除しますか？"
      );
      if (isDelete) {
        axios
          .post("/changeAuthority", {
            email: admin.email,
            authority: 2,
            updateUserId: this.$store.state.loginUser.userId,
          })
          .then((response) => {
            let index = this.adminList.findIndex(
              (item) => item.email === response.data.email
            );
            this.adminList.splice(index, 1);
            alert(response.data.name + "さんを管理者ユーザーから削除しました");
          })
          .catch(() => alert("管理者権限の変更に失敗しました"));
      }
    },
    vlistItemClick() {
      /** コンソールエラー回避とUI機能の維持のため置いておく */
    },
  },
  created() {
    this.setAdminList();
  },
};
</script>
