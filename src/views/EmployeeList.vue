<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <AdminSideNav></AdminSideNav>
    <EmployeeListHeader />
    <EmployeeList />
  </div>
</template>

<script>
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import axios from "axios";
import Menubotton from "../components/Menubotton";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    EmployeeListHeader,
    EmployeeList,
    Menubotton,
    AdminSideNav
  },
  data() {
    return {
      employeeList: [],
    };
  },
  methods: {
    setEmployeeList() {
      axios
        .get("http://localhost:8080/showEmployeeList")
        .then((response) => {
          this.employeeList = response.data;
        })
        .catch((e) => {
          alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
        });
    },
  },
  created() {
    this.setEmployeeList();
  },
};
</script>
