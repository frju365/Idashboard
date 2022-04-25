import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import './registerServiceWorker'

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
