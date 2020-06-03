import Vue from "vue";
// Vee-validateのインポート
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { digits, regex, email, required } from "vee-validate/dist/rules";

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
  message: "入力は必須です",
});

extend("checkDep", {
  ...required,
  message: "所属部門入力は必須です",
});

extend("checkRequiredHireMonthYear", {
  ...required,
  message: "入社年月入力は必須です",
});

extend("hireMonthYear", {
  params: ["target"],
  validate(value, { target }) {
    return value !== null && target !== null;
  },
  message: "入社年月の入力は必須です",
});

// ユーザ登録に使うvalidation
extend("regex", regex);
extend("userName", {
  ...required,
  ...regex,
  message: "全角で入力してください。",
});
extend("userNameKana", {
  ...required,
  ...regex,
  message: "全角平仮名で入力してください。",
});

extend("email", {
  ...email,
  message: "メールアドレスの形式ではありません",
});

extend("rakuspartners", {
  ...regex,
  message:
    "メールドメインがrakus-partners.co.jpまたはrakus.co.jpのみ更新できます",
});
// extend("rakus", {
//   ...regex,
//   message:
//     "メールドメインがrakus-partners.co.jpまたはrakus.co.jpのみ更新できます",
// });
// // extend("checkRakuspartners", {
//   valid: /^[a-zA-Z0-9_.-]+@rakus-partners.co.jp/,
//   message:
//     "メールドメインがrakus-partners.co.jpまたはrakus.co.jpのみ更新できます",
// //regex:
//                 /^[a-zA-Z0-9_.-]+@rakus-partners.co.jp/
//                 | /^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@rakus.co.jp/,
// // });

extend("digits", digits);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
