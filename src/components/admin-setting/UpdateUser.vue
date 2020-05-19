<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1 card">
    <template v-slot:item.update="{ item }">
      <router-link
        :to="{
          name: 'UpdateUserForm',
          params: {
            userId: item.userId,
            name: item.name,
            kana: item.kana,
            mail: item.mail,
            depId: item.depId,
            depName: item.depName,
            hireDate: item.hireDate,
            version: item.version,
          },
        }"
      >
        <v-fa :icon="['fas', 'edit']" size="lg" class="edit"></v-fa>
      </router-link>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-fa :icon="['fas', 'trash-alt']" size="lg" @click="deleteConfirm(item)" class="delete"></v-fa>
    </template>
  </v-data-table>
</template>

<script>
import {mapActions} from "vuex"
import Status from "@/assets/js/Status"
import axios from "axios"
export default {
  props: {
    employeeList: Array
  },
  watch: {
    employeeList: function() {
      this.items = this.employeeList;
    }
  },
  data() {
    return {
      headers: [
        {
          value: "name",
          text: "名前",
          sortable: true
        },
        {
          value: "kana",
          text: "ふりがな",
          sortable: true
        },
        {
          value: "mail",
          text: "メールアドレス",
          sortable: true
        },
        {
          value: "depName",
          text: "部署名",
          sortable: true
        },
        {
          value: "hireDate",
          text: "入社月",
          sortable: true
        },
        {
          value: "update",
          text: "更新",
          sortable: false
        },
        {
          value: "delete",
          text: "削除",
          sortable: false
        }
      ],
      items: [],
      deleteStatus: Status.DELETED,
      loginUserId:this.$store.state.loginUser.userId
    };
  },
  methods: {
    deleteConfirm(user) {
      if (confirm("削除してよろしいですか？")) {
        axios.post("/status", {
          userId: user.userId,
          userVersion: user.version,
          updateUserStatus: this.deleteStatus,
          updateUserId:this.loginUserId
        }).then(
          this.deleteUser(user.userId),
          alert("削除しました"),
          this.$router.push("/")
        ).catch(
          alert("問題が発生しました。もう1度作業をやり直してください。"),
          this.$router.push("/top")
        );

      }
    },
        ...mapActions(["deleteUser"]),
  },
  mounted() {
    this.items = this.employeeList;
  }
};
</script>
<style>
.theme--light.v-data-table thead tr th {
  background-color: #28a745 !important;
  color: white !important;
}
.edit:hover {
  cursor: pointer;
  color: crimson;
}
.delete:hover {
  cursor: pointer;
  color: blue;
}
</style>
