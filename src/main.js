import Vue from 'vue';
import App from './App';
import router from './router';

import config from '../slf-config';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});