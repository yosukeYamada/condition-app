<template>
    <b-modal id="authority-modal" centered title="管理者権限の付与・削除">
      <v-subheader>
        <b-row>
          <b-col sm="10" class="pr-0 pb-1">
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
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.email"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </b-col>
          <b-col sm="2" class="pb-1">
            <b-button size="sm" @click="addAdminAuthority()">追加</b-button>
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
import "vue-simple-suggest/dist/styles.css";
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      item: "",
      adminList: [],
      employeeList: [],
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
    setEmployeeList() {
      let employees = this.$store.state.employeeList.filter(
        (employee) => employee.authority === 2
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
    addAdminAuthority() {
      let isAdd = window.confirm(
        this.item.name + "を管理者ユーザーに追加しますか？"
      );
      if (isAdd) {
        axios
          .post("/changeAuthority", {
            email: this.item.email,
            authority: 1,
            updateUserId: this.$store.state.loginUser.userId,
            version: this.item.version,
          })
          .then((response) => {
            if (response.data.email == "null") {
              alert("そのメールアドレスは登録されていません");
            } else if (response.data.version == "null") {
              alert("version番号被り");
            } else {
              alert(response.data.name + "さんに管理者権限を付与しました");
              this.adminList.push({
                name: response.data.name,
                email: response.data.email,
              });
              this.item = "";
              let index = this.employeeList.findIndex(
                (item) => item.email === response.data.email
              );
              this.employeeList.splice(index, 1);
            }
          });
      } // .catch(alert("管理者権限の付与に失敗しました"));
    },
    deleteAdminAuthority(admin) {
      console.log(admin);
      let isDelete = window.confirm(
        admin.name + "さんを管理者ユーザーから削除しますか？"
      );
      if (isDelete) {
        axios
          .post("/changeAuthority", {
            email: admin.email,
            authority: 2,
            updateUserId: this.$store.state.loginUser.userId,
            version: admin.version,
          })
          .then((response) => {
            let index = this.adminList.findIndex(
              (item) => item.email === response.data.email
            );
            this.adminList.splice(index, 1);
            this.employeeList.push({
              name: response.data.name,
              email: response.data.email,
            });
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
    this.setEmployeeList();
  },
};
</script>
