import Vue from 'vue';
import Counter from '@app/components/Counter.vue';
import vuetify from './vuetify';

export function render(element: string) {
  new Vue({
    vuetify,
    render: h => h(Counter),
  }).$mount(element);
}
