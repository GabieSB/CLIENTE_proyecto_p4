import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import store from "./store"

import VueAxios from 'vue-axios'
import VueAlertify from "vue-alertify"
import VueFormulate from '@braid/vue-formulate'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/form.css'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueAxios, axios)
 
Vue.use(VueAlertify)
Vue.use(VueFormulate)




Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
