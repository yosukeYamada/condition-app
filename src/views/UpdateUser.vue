<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col>
        <h2 class="mb-4">ユーザー情報の更新・削除</h2>
        <UpdateUser :employee-list="employeeList" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import UpdateUser from "../components/admin-setting/UpdateUser";
import axios from "axios";

export default {
  components: {
    UpdateUser,
  },
  data() {
    return {
      masterList: [],
      employeeList: [],
    };
  },
  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },
  },
  watch: {
    masterList: function() {
      var masterList = this.masterList;
      var employeeList = masterList.map(function(elm) {
        let hireDate = moment(elm.hireDate).format("YYYY-MM");
        return {
          userId: elm.userId,
          name: elm.userName,
          kana: elm.userNameKana,
          mail: elm.mailList[0].mailName,
          depId: elm.dep.depId,
          depName: elm.dep.depName,
          hireDate: hireDate,
        };
      });
      this.employeeList = employeeList;
    },
  },

  created() {
    this.getMasterList();
    //全従業員情報を取得
    axios
      .get("/showEmployeeList")
      .then((response) => {
        this.$store.dispatch("employeeList", response.data);
      })
      .catch((e) => {
        alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
      });
  },
};
</script>
