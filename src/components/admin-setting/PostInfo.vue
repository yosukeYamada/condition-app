<template>
  <b-card
    border-variant="success"
    header="部署名の変更、追加及び削除"
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
          v-model="select"
          :items="categories"
          :rules="[v => !!v || 'カテゴリーを選択してください']"
          label="カテゴリー"
          required
        ></v-select>
        <v-textarea
          v-model="contents"
          :rules="contactFormValidation.contentsRules"
          label="内容"
          required
        ></v-textarea>
        <v-btn
          :loading="loading"
          :disabled="!contactFormValidation.valid"
          @click="post()"
          block
          large
          color="info"
          class="mt-4 font-weight-bold"
        >投稿
        </v-btn>

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
import axios from "axios";
export default {
    data: () => ({
        title: '',
        categoty: '',
        contents: '',
        loading: false,
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
      select: null,
      categories:[]
    }),
    methods: {
      post: function () {
        if (this.$refs.form.validate()) {
          this.contactForm.loading = true
          axios.post("")
            .then(() => {
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
            .finally(() => {
              this.contactForm.loading = false
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
        console.log(this.$store.state.category[num].categoryName)
        this.categories.push(this.$store.state.category[num].categoryName)
      }
    }
  }
</script>