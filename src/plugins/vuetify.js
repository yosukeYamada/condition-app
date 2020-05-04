import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import ja from 'vuetify/es5/locale/ja.js'
import Vue from "vue";
import Vuetify from "vuetify/lib";


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  lang: {
    locales: {ja},
    current: 'ja'
  }
});
