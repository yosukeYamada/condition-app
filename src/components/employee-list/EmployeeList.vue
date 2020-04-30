<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>
<script>
export default {
  props: {
    employeeList: Array,
  },
  watch: {
    employeeList: function() {
      this.items = this.employeeList;
    },
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "名前",
          sortable: true,
        },
        {
          key: "dep",
          label: "部署名",
          sortable: true,
        },
        {
          key: "hireDate",
          label: "入社月",
          sortable: true,
        },
        {
          key: "motivation",
          label: "やる気",
          sortable: true,
        },
        {
          key: "condition",
          label: "体調",
          sortable: true,
        },
        {
          key: "performance",
          label: "成果",
          sortable: true,
        },
        {
          key: "comment",
          label: "コメント",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  mounted() {
    this.items = this.employeeList;
  },
};
</script>
