<template>
  <v-app class="px-5 mt-5">
    <counter />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from '@app/components/Counter.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Counter,
  },
});
</script>
