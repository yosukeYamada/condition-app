import Vue from "vue";
// Vee-validateのインポート
import { extend,ValidationObserver, ValidationProvider } from "vee-validate";
import {digits,regex,email,required} from 'vee-validate/dist/rules'

extend('regex',regex)
extend('userName',{
  ...regex,
  message:"20文字以内の全角で入力してください。"
});
extend('userNameKana',{
  ...regex,
  ...required,
  message:"20文字以内の半角片仮名で入力してください。"
});

extend('email',{
  ...email,
  message:'メールアドレスの形式ではありません'
})

extend("digits",digits)

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message:"文字列を入力して下さい"
});
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
