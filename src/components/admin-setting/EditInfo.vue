<template>
  <b-card
    border-variant="success"
    header="更新情報の編集・削除"
    header-bg-variant="success"
    header-text-variant="white"
    style="border-width:2px;"
  >
    <v-container class="bottom">
      <v-form
        ref="form"
        class="form"
        v-model="contactFormValidation.valid"
        lazy-validation
      >
        <v-text-field
          v-model="title"
          :rules="contactFormValidation.nameRules"
          label="タイトル"
          required
        ></v-text-field>
        <v-select
          v-model="categoryId"
          :items="categories"
          :rules="[(v) => !!v || 'カテゴリーを選択してください']"
          label="カテゴリー"
          item-text="categoryName"
          item-value="categoryId"
          required
        ></v-select>
        <v-textarea
          v-model="content"
          :rules="contactFormValidation.contentsRules"
          label="内容"
          rows="8"
          required
        ></v-textarea>
        <b-button
          :disabled="!contactFormValidation.valid"
          @click="update()"
          block
          large
          variant="outline-success"
          class="mt-4 font-weight-bold"
          >更新
        </b-button>
        <b-button
          @click="del()"
          block
          large
          variant="outline-danger"
          class="mt-4 font-weight-bold"
          >削除
        </b-button>

        <v-snackbar
          v-model="snackBar.show"
          :color="snackBar.color"
          :timeout="3000"
          top
          class="font-weight-bold"
        >
          {{ snackBar.message }}
        </v-snackbar>
      </v-form>
    </v-container>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import Status from "@/assets/js/Status";
export default {
  data: () => ({
    title: "",
    content: "",
    categoryId: "",
    categories: [],
    contactFormValidation: {
      valid: false,
      nameRules: [(v) => !!v || "タイトルは必須項目です"],
      contentsRules: [(v) => !!v || "内容は必須項目です"],
    },
    snackBar: {
      show: false,
      color: "",
      message: "",
    },
  }),
  methods: {
    ...mapActions(["setInformation"]),
    update() {
      if (this.$refs.form.validate()) {
        axios
          .post("/info/update", {
            informationId: this.info.informationId,
            title: this.title,
            content: this.content,
            categoryId: this.categoryId,
            updateUserId: this.$store.state.loginUser.userId,
            version: this.info.version,
          })
          .then((response) => {
            if (response.data === Status.HOLD) {
              alert(
                "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
              );
            } else {
              this.setInformation(response.data);
              this.formReset();
              alert("更新完了しました");
              this.$router.push("/editInformationList");
            }
          })
          .catch((err) => {
            this.showSnackBar(
              "error",
              "更新に失敗しました。時間をおいて再度お試しください。"
            );
            console.log(err);
          });
      }
    },
    del() {
      if (confirm("削除してよろしいですか？")) {
        axios
          .post("/info/delete", {
            informationId: this.info.informationId,
            status: Status.DELETED,
            version: this.info.version,
            updateUserId: this.$store.state.loginUser.userId,
          })
          .then((response) => {
            if (response.data === Status.HOLD) {
              alert(
                "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
              );
            } else {
              alert("削除しました");
              this.$router.push("/editInformationList");
            }
          });
      }
    },
    showSnackBar: function(color, message) {
      this.snackBar.message = message;
      this.snackBar.color = color;
      this.snackBar.show = true;
    },
    formReset: function() {
      this.$refs.form.reset();
    },
  },
  created() {
    for (var num in this.$store.state.categoryList) {
      this.categories.push({
        categoryId: this.$store.state.categoryList[num].categoryId,
        categoryName: this.$store.state.categoryList[num].categoryName,
      });
    }
    this.title = this.info.informationTitle;
    this.categoryId = this.info.categoryId;
    this.content = this.info.informationContent;
  },
  computed: {
    info() {
      return JSON.parse(decodeURIComponent(this.$route.query.info));
    },
  },
};
</script>
