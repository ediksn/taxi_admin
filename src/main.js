import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCookies from "vue-cookies";
import * as VueGoogleMaps from "vue2-google-maps";
import * as jsPDF from "jspdf";
import VueFlashMessage from "vue-flash-message";
import VueSweetalert2 from "vue-sweetalert2";
import VueGoogleCharts from "vue-google-charts";
import VueApexCharts from "vue-apexcharts";
import "element-ui/lib/theme-chalk/index.css";
import { computeArea } from "spherical-geometry-js";
import { DatePicker } from "element-ui";
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";
import VueSocketIO from "vue-socket.io";
import firebase from "firebase";
import EXIF from "exif-js";
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:9000",
    // connection: 'http://192.168.3.106:9000',
    // connection: 'http://192.168.43.223:9000',
    // connection: "http://taxi.dvrve.net:9000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBRpCCElS01eGX097g5r66aCbGf65piKCA",
  authDomain: "apolo-taxi-547f9.firebaseapp.com",
  databaseURL: "https://apolo-taxi-547f9.firebaseio.com",
  projectId: "apolo-taxi-547f9",
  storageBucket: "apolo-taxi-547f9.appspot.com",
  messagingSenderId: "133377262328"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// configure language
locale.use(lang);
Vue.use(DatePicker);
Vue.use(computeArea);
Vue.use(VueApexCharts);
Vue.use(EXIF);

Vue.component("apexchart", VueApexCharts);

const moment = require("moment");
require("moment/locale/es");

Vue.use(require("vue-moment"), {
  moment
});
Vue.use(jsPDF);
Vue.use(VueGoogleCharts);
Vue.use(VueSweetalert2);
require("vue-flash-message/dist/vue-flash-message.min.css");
Vue.use(VueFlashMessage);
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCeheP7N3nMtkIeE2P56lW1umQM1fyHCwE",
    libraries: "places,directions" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
