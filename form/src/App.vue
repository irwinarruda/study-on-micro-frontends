<template>
  <v-app>
    <v-card class="pa-5 mt-5">
      <h1 class="font-weight-regular">VueJs Counter</h1>
      <h2 class="mt-1 font-weight-regular">{{ counter.count }}</h2>
      <div class="d-flex mt-2">
        <v-btn v-on:click="counter.decrement" color="error">Decrement</v-btn>
        <v-btn class="ml-3" v-on:click="counter.increment" color="success">Increment</v-btn>
      </div>
    </v-card>
  </v-app>
</template>

<script lang="js">
import Vue from 'vue';
import { observer } from 'mobx-vue';
import { useStore } from 'host/Store';

const { counter } = useStore();

export default observer({
  name: 'App',
  data() {
    const { counter } = useStore();
    return {
      counter: counter,
    };
  },
});
</script>

<style>
.v-application,
.v-application--is-ltr {
  background-color: initial !important;
}
</style>
