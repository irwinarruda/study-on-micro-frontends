<script context="module">
  import { connect } from 'svelte-mobx';
</script>

<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Card, { Content } from '@smui/card';

  import { useStore } from 'host/Store';

  const { autorun } = connect();
  let { counter } = useStore();

  let count: number;
  function increment() { counter.increment() };
  function decrement() { counter.decrement() };

  autorun(() => {
    count = counter.count;
  });
</script>

<Card marginheight={20}>
  <Content>
    <h1 class="mdc-typography--headline4">Svelte Counter</h1>
    <h2 class="mdc-typography--headline5">{count}</h2>
    <Button color="secondary" variant="raised" on:click={decrement}><Label>Decrement</Label></Button>
    <Button color="primary" variant="raised" on:click={increment}><Label>Increment</Label></Button>
  </Content>
</Card>

<style>
  h1 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 400;
  }
  h2 {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
