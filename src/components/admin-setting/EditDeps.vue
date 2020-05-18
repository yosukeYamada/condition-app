<template>
  <b-card
    border-variant="success"
    header="部署名の変更、追加及び削除"
    header-bg-variant="success"
    header-text-variant="white"
    style="border-width:2px;"
  >
    <v-list two-line subheader dense>
      <v-subheader>新規に部署を追加する</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <b-form-input
              size="sm"
              placeholder="追加する部署名を入力"
              v-model="inputAddDepName"
            ></b-form-input>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text class="pl-4">
          <b-button variant="outline-success" size="sm" @click="addNewDep()"
            >追加</b-button
          >
        </v-list-item-action-text>
      </v-list-item>
      <v-divider></v-divider>
      <v-subheader>現在の部署一覧</v-subheader>
      <v-list-group v-for="(dep, index) in depList" :key="dep.id" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="dep.depName"></v-list-item-title>
            <v-list-item-subtitle
              >最終更新日：{{ toDate(dep.updateDate) }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >最終更新者：{{
                getUpdateUserName(dep.updateUserId) + "さん"
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </template>
        <v-list-item @click="vlistItemClick()" dense>
          <v-list-item-icon class="mb-0 mr-3 pt-4">
            <v-icon v-text="'mdi-pencil'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="pb-3">
              <small>部署名を変更する</small>
              <b-form-input
                v-model="inputNewDepName"
                size="sm"
                placeholder="変更後の部署名を入力"
              ></b-form-input>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text class="pl-4">
            <b-button
              variant="outline-success"
              size="sm"
              @click="changeDepName(dep.depId, dep.version)"
              >変更</b-button
            >
          </v-list-item-action-text>
        </v-list-item>
        <v-list-item @click="vlistItemClick()" dense>
          <v-list-item-icon class="mb-0 mr-3 pt-1">
            <v-icon v-text="'mdi-delete'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              この部署を削除する
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <b-button
              variant="outline-danger"
              size="sm"
              @click="deleteDep(dep.depName, dep.depId, dep.version)"
              >削除</b-button
            >
          </v-list-item-action-text>
        </v-list-item>
        <v-divider v-if="index + 1 < depList.length" :key="index"></v-divider>
      </v-list-group>
    </v-list>
  </b-card>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      inputNewDepName: "",
      inputAddDepName: "",
    };
  },
  computed: {
    depList: function() {
      return this.$store.state.depList;
    },
  },
  methods: {
    toDate(stringDate) {
      return moment(stringDate).format("YYYY-MM-DD HH:mm");
    },
    getUpdateUserName(updateUserId) {
      let updateUserName = this.$store.state.employeeList.find((employee) => {
        if (employee.userId === updateUserId) {
          return employee;
        }
      }).userName;
      return updateUserName;
    },
    addNewDep() {
      /** 入力値チェックが完了してからこのメソッドを実行するようにする */
      this.$store.dispatch("addNewDep", {
        depName: this.inputAddDepName,
        registerUserId: this.$store.state.loginUser.userId,
      });
      this.inputAddDepName = "";
    },
    changeDepName(depId, version) {
      axios
        .post("/editDeps/exclusiveProcessing", {
          depId: depId,
          version: version,
        })
        .then((isCheck) => {
          if (isCheck.data) {
            this.$store.dispatch("changeDepName", {
              depId: depId,
              depName: this.inputNewDepName,
              updateUserId: this.$store.state.loginUser.userId,
            });
          } else {
            alert(
              "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
            );
          }
        })
        .catch((error) => {
          alert("エラーが発生しました。\nしばらくの後、再度実行してください。");
          console.error(error);
          return false;
        });
    },
    deleteDep(depName, depId, version) {
      let isOK = window.confirm(
        "本当に" + depName + "を削除してもよろしいでしょうか？"
      );
      if (isOK) {
        axios
          .post("/editDeps/exclusiveProcessing", {
            depId: depId,
            version: version,
          })
          .then((isCheck) => {
            if (isCheck.data) {
              axios
                .post("/editDeps/checkIsEmployeeBelong", { depId })
                .then((isEmployeeBelong) => {
                  if (isEmployeeBelong.data) {
                    this.$store.dispatch("deleteDep", {
                      depName,
                      depId,
                      updateUserId: this.$store.state.loginUser.userId,
                    });
                  } else {
                    alert(
                      depName +
                        "には所属している従業員がいるため削除できません。"
                    );
                  }
                })
                .catch((error) => {
                  alert(
                    "Bエラーが発生しました。\nしばらくの後、再度実行してください。"
                  );
                  console.error(error);
                });
            } else {
              alert(
                "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
              );
            }
          })
          .catch((error) => {
            alert(
              "Aエラーが発生しました。\nしばらくの後、再度実行してください。"
            );
            console.error(error);
            return false;
          });
      }
    },
    vlistItemClick() {
      /** コンソールエラー回避とUI機能の維持のため置いておく */
    },
  },
};
</script>
