import Vue from 'vue';
import App from '../App.vue';
import vuetify from './vuetify';

export function render(element: string) {
  new Vue({
    vuetify,
    render: h => h(App),
  }).$mount(element);
}
