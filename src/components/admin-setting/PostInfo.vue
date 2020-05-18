<template>
  <b-card
    border-variant="success"
    header="トップページのNews投稿"
    header-bg-variant="success"
    header-text-variant="white"
    style="border-width:2px;"
  >           
   <v-container class="bottom">
    <v-form ref="form" class="form" v-model="contactFormValidation.valid" lazy-validation>
      <v-text-field
        v-model="title"
        :rules="contactFormValidation.nameRules"
        label="タイトル"
        required
      ></v-text-field>
        <v-select
          v-model="categoryId"
          :items="categories"
          :rules="[v => !!v || 'カテゴリーを選択してください']"
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
          @click="post()"
          block
          large
          variant="outline-success"
          class="mt-4 font-weight-bold"
        >投稿
        </b-button>

        <v-snackbar
          v-model="snackBar.show"
          :color="snackBar.color"
          :timeout="3000"
          top
          class="font-weight-bold"
          >
          {{snackBar.message}}
        </v-snackbar>
      </v-form>
    </v-container>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
    data: () => ({
        title: '',
        content: '',
        categoryId:"",
        categories:[],
        contactFormValidation: {
        valid: false,
        nameRules: [v => !!v || 'タイトルは必須項目です'],
        contentsRules: [v => !!v || '内容は必須項目です']
      },
      snackBar: {
        show: false,
        color: '',
        message: ''
      },
    }),
    methods: {
      ...mapActions(["setInformation"],),
      post: function () {
        if (this.$refs.form.validate()) {
          axios.post("/information/insert", {
            title: this.title,
            content: this.content,
            categoryId : this.categoryId,
            registerUserId: this.$store.state.loginUser.userId
          })
            .then((response) => {
              this.setInformation(response.data)
              this.formReset()
              this.showSnackBar(
                'success',
                '投稿完了しました。'
              )
            })
            .catch(err => {
              this.showSnackBar(
                'error',
                '投稿に失敗しました。時間をおいて再度お試しください。'
              )
              console.log(err)
            })
        }
      },
      showSnackBar: function (color, message) {
        this.snackBar.message = message
        this.snackBar.color = color
        this.snackBar.show = true
      },
      formReset: function () {
        this.$refs.form.reset()
      }
    },
    created() {
      for( var num in this.$store.state.category) {
        this.categories.push({
          categoryId: this.$store.state.category[num].categoryId,
          categoryName : this.$store.state.category[num].categoryName}
        )
      }
    },
  }
</script>