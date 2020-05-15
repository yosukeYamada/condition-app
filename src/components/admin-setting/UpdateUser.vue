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
          },
        }"
      >
        <v-fa :icon="['fas', 'edit']" size="lg" class="edit"> </v-fa>
      </router-link>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-fa
        :icon="['fas', 'trash-alt']"
        size="lg"
        @click="deleteConfirm(item.UserId)"
        class="delete"
      >
      </v-fa>
    </template>
  </v-data-table>
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
      headers: [
        {
          value: "name",
          text: "名前",
          sortable: true,
        },
        {
          value: "kana",
          text: "ふりがな",
          sortable: true,
        },
        {
          value: "mail",
          text: "メールアドレス",
          sortable: true,
        },
        {
          value: "depName",
          text: "部署名",
          sortable: true,
        },
        {
          value: "hireDate",
          text: "入社月",
          sortable: true,
        },
        {
          value: "update",
          text: "更新",
          sortable: false,
        },
        {
          value: "delete",
          text: "削除",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  methods: {
    deleteConfirm(id) {
      if (confirm("削除してよろしいですか？")) {
        this.delete({ id });
      }
    },
  },
  mounted() {
    this.items = this.employeeList;
  },
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
