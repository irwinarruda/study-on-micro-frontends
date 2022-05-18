import Vue from 'vue';
import App from './App.vue';
import vuetify from '@app/utils/vuetify';

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#root');
