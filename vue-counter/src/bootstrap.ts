import Vue from 'vue';
import vuetify from '@app/utils/vuetify';
import App from './App.vue';

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#root');

export {};
