<template>
  <b-modal
    id="edit-deps-modal"
    ok-title="閉じる"
    ok-only
    centered
    title="部署名の変更・追加・削除"
  >
    <v-list two-line subheader dense>
      <v-subheader>新規に部署を追加する</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <b-form-input
              size="sm"
              placeholder="追加する部署名を入力"
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
              @click="changeDepName(dep.id, dep.version)"
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
              @click="deleteDep(dep.depName, dep.id, dep.version)"
              >削除</b-button
            >
          </v-list-item-action-text>
        </v-list-item>
        <v-divider v-if="index + 1 < depList.length" :key="index"></v-divider>
      </v-list-group>
    </v-list>
  </b-modal>
</template>
<script>
import moment from "moment";
// import axios from "axios";

export default {
  data() {
    return {
      depList: [],
      inputNewDepName: "",
      inputAddDepName: "",
    };
  },
  methods: {
    toDate(stringDate) {
      // "2020-04-27T00:00:00.000+0000"
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
      alert("まだ実装できてません！");
      console.log(this.inputAddDepName);
      //   axios
      //     .post("/addNewDep", {
      //       depName: this.inputAddDepName,
      //       updateUserId: this.$store.state.loginUser.userId,
      //     })
      //     .then((response) => {
      //       alert("部署名の変更が完了しました！");
      //       this.inputNewDepName = "";
      //       console.log(response.data);
      //     })
      //     .catch((error) => {
      //       alert("部署名の変更に失敗しました！");
      //       console.error(error);
      //     });
    },
    changeDepName(depId, version) {
      alert("まだ実装できてません！");
      console.log({ depId: depId, version: version });
      //   axios
      //     .post("/changeDepName", {
      //       depId: depId,
      //       depName: this.inputNewDepName,
      //       updateUserId: this.$store.state.loginUser.userId,
      //       version: version,
      //     })
      //     .then((response) => {
      //       alert("部署名の変更が完了しました！");
      //       this.inputNewDepName = "";
      //       console.log(response.data);
      //     })
      //     .catch((error) => {
      //       alert("部署名の変更に失敗しました！");
      //       console.error(error);
      //     });
    },
    deleteDep(depName, depId, version) {
      let isOK = window.confirm("本当に" + depName + "を削除してもよろしいでしょうか？\n\n※ 削除する部署には従業員が1名も所属していないことを確認してください");
      if(isOK){
          console.log({ depId: depId, version: version });
      }
    },
    vlistItemClick() {
      /** コンソールエラー回避とUI機能の維持のため置いておく */
    },
  },
  mounted() {
    this.depList = this.$store.state.depList;
  },
};
</script>
