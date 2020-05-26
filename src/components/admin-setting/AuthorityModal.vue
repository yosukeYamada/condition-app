<template>
  <b-modal id="authority-modal"  ok-only centered title="管理者権限の付与・削除">
    <b-row align-v="center" class="px-3 mb-3">
      <v-subheader>管理者ユーザーの追加</v-subheader>
      <b-col cols="12" sm="10" class="py-0">
        <v-autocomplete
          v-model="item"
          :items="employeeList"
          label="メールアドレスで管理者を追加"
          item-text="email"
          item-value="item"
          return-object
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.email"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </b-col>
      <b-col cols="3" sm="2" class="pb-1 pt-0">
        <b-button variant="outline-success" :disabled="item === ''" size="sm" @click="addAdminAuthority()"
          >追加</b-button
        >
      </b-col>
    </b-row>
    <v-divider></v-divider>
    <v-list two-line subheader>
      <v-subheader>管理者ユーザーの一覧</v-subheader>
      <v-list-item
        v-for="admin in adminList"
        :key="admin.email"
        @click="vlistItemClick"
      >
        <v-list-item-content>
          <v-list-item-title v-text="admin.name"></v-list-item-title>
          <v-list-item-subtitle
            class="mb-2"
            v-text="admin.email"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            >最終更新日：{{ toDate(admin.updateDate) }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            >最終更新者：{{
              getUpdateUserName(admin.updateUserId)
            }}</v-list-item-subtitle
          >
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
import { mapActions } from "vuex";
import firebase from "firebase/app";
import axios from "axios";
import AUTHORITY from "@/assets/js/Authority.js";
import "vue-simple-suggest/dist/styles.css";
import moment from "moment";

export default {
  data() {
    return {
      item: "",
      adminList: [],
      employeeList: [],
    };
  },
  methods: {
    ...mapActions(["switchLoginStatus","resetState"]),
    /**
     * 管理者一覧の取得を行うメソッド
     */
    setAdminList() {
      let adminList = this.$store.state.employeeList.filter(
        (employee) => employee.authority === AUTHORITY.ADMIN
      );
      this.adminList = adminList.map((employee) => {
        try {
          return {
            name: employee.userName,
            email: employee.mailList[0].mailName,
            version: employee.version,
            updateUserId: employee.updateUserId,
            updateDate: employee.updateDate,
          };
        } catch (error) {
          return {
            name: employee.userName,
            email: "",
            version: "",
            updateUserId: "",
            updateDate: "",
          };
        }
      });
    },
    /**
     * オートコンプリート用の従業員一覧の取得を行うメソッド
     */
    setEmployeeList() {
      let employees = this.$store.state.employeeList.filter(
        (employee) => employee.authority === AUTHORITY.USER
      );
      this.employeeList = employees.map((employee) => {
        try {
          return {
            name: employee.userName,
            email: employee.mailList[0].mailName,
            version: employee.version,
          };
        } catch (error) {
          return {
            name: employee.userName,
            email: "",
            version: "",
          };
        }
      });
    },
    /**
     * 管理者権限の付与を行うメソッド
     */
    addAdminAuthority() {
      let isAdd = window.confirm(
        this.item.name + "を管理者ユーザーに追加しますか？"
      );
      if (isAdd) {
        axios
          .post("/changeAuthority", {
            email: this.item.email,
            authority: AUTHORITY.ADMIN,
            updateUserId: this.$store.state.loginUser.userId,
            version: this.item.version,
          })
          .then((response) => {
            if (response.data.authority === AUTHORITY.OUTSIDER) {
              /** ケース1:従業員が存在しなかった場合 */
              alert("そのメールアドレスは登録されていません");
            } else if (response.data.version === 0) {
              /** ケース2-1:排他制御に引っかかった場合(最新版じゃなかった場合) */
              alert(
                "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
              );
            } else {
              /** ケース2-2:従業員が存在してかつ変更するデータが最新版の場合(期待する処理) */
              alert(response.data.userName + "さんに管理者権限を付与しました");

              /** ステップ1:管理者一覧にユーザー情報を追加 */
              this.adminList.push({
                name: response.data.userName,
                email: this.item.email,
                updateUserId: response.data.updateUserId,
                updateDate: response.data.updateDate,
                version: response.data.version,
              });

              /** ステップ2:オートコンプリートの従業員一覧から削除 */
              let index = this.employeeList.findIndex(
                (item) => item.email === response.data.email
              );
              this.employeeList.splice(index, 1);

              /** ステップ3:storeの従業員一覧内のユーザー情報を更新する */
              let updatedUser = {
                userId: response.data.userId,
                updateUserId: response.data.updateUserId,
                updateDate: response.data.updateDate,
                version: response.data.version,
                authority: response.data.authority,
              };
              this.$store.dispatch("updateUserAuthority", updatedUser);

              /** ステップ4:フォームを空にする */
              this.item = "";

            }
          })
          .catch((e) => {
            alert("管理者権限の付与に失敗しました");
            console.error(e);
          });
      }
    },
    /**
     * 管理者権限の削除を行うメソッド
     * @param admin 削除する管理者ユーザー情報
     */
    deleteAdminAuthority(admin) {
      let isDelete = window.confirm(
        admin.name + "さんを管理者ユーザーから削除しますか？"
      );
      if (isDelete) {
        axios
          .post("/changeAuthority", {
            email: admin.email,
            authority: AUTHORITY.USER,
            updateUserId: this.$store.state.loginUser.userId,
            version: admin.version,
          })
          .then((response) => {
            let index = this.adminList.findIndex(
              (item) => item.email === admin.email
            );
            /** ステップ1:管理者一覧からユーザー情報を削除 */
            this.adminList.splice(index, 1);

            /** ステップ2:オートコンプリートの従業員一覧に追加 */
            this.employeeList.push({
              name: response.data.userName,
              email: admin.email,
              version: response.data.version,
            });

            /** ステップ3:storeの従業員一覧内のユーザー情報を更新する */
            let updatedUser = {
              userId: response.data.userId,
              updateUserId: response.data.updateUserId,
              updateDate: response.data.updateDate,
              version: response.data.version,
              authority: response.data.authority,
            };
            this.$store.dispatch("updateUserAuthority", updatedUser);
            alert(
              response.data.userName + "さんを管理者ユーザーから削除しました"
            );

              let loginUser = this.$store.state.employeeList.filter(
                  (loginUser) => loginUser.userId === this.$store.state.loginUser.userId
                )
              if(loginUser[0].authority == AUTHORITY.USER) {
                firebase.auth().signOut();
                this.$router.push("/");
                this.switchLoginStatus(false);
                this.resetState();
              }

          })
          .catch((e) => {
            alert("管理者権限の変更に失敗しました");
            console.error(e);
          });
      }
    },
    /**
     * 文字列の日付をフォーマットするメソッド
     * @param stringDate 文字列の日付
     */
    toDate(stringDate) {
      if (stringDate !== null) {
        return moment(stringDate).format("YYYY-MM-DD HH:mm");
      } else {
        return "-";
      }
    },
    /**
     * ユーザーIDからユーザー名を取得するメソッド
     * @param updateUserId ユーザー名を取得したいユーザーのID
     */
    getUpdateUserName(updateUserId) {
      if (updateUserId !== null) {
        let updateUserName = this.$store.state.employeeList.find((employee) => {
          if (employee.userId === updateUserId) {
            return employee;
          }
        }).userName;
        return updateUserName + "さん";
      } else {
        return "-";
      }
    },
    vlistItemClick() {
      /** コンソールエラー回避とUI機能の維持のため置いておく */
    },
  },
  created() {
    this.setAdminList();
    this.setEmployeeList();
  },
  computed: {
    emp() {
      return this.$store.state.employeeList.filter(
        (employee) => employee.authority === AUTHORITY.USER
      );
    },
    adm() {
      return this.$store.state.employeeList.filter(
        (employee) => employee.authority === AUTHORITY.ADMIN
      )
    },
  },
  watch: {
    emp() {
      this.setEmployeeList()
    },
    adm() {
      this.setAdminList()
    },
  }
};
</script>