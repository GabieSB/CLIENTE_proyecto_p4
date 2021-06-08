import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import VueAxios from 'vue-axios'
import VueAlertify from "vue-alertify"


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
 
Vue.use(VueAlertify)

Vue.config.productionTip = false;

export const main = new Vue({
  router,
  data: {
    AppContext: {}
  },
  render: (h) => h(App),
}).$mount("#app");
