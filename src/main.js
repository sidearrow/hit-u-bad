import Vue from 'vue';
import App from './App';
import router from './router';

import {
  MdApp,
  MdButton,
  MdCard,
  MdContent,
  MdDrawer,
  MdIcon,
  MdList,
  MdToolbar,
} from 'vue-material/dist/components';

import 'vue-material/dist/vue-material.min.css';

Vue.use(MdApp);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdDrawer);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdToolbar);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});