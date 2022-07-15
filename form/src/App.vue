<template>
  <v-app>
    <v-card class="pa-5 mt-5">
      <h1 class="font-weight-regular">{{ message }}</h1>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      message: 'VueJs Form!',
    };
  },
});
</script>
