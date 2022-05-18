<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Card, { Content } from '@smui/card';
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }
</script>

<div>
  <Card>
    <Content>
      <h1 class="mdc-typography--headline2">SvelteJs Counter</h1>
      <h2 class="mdc-typography--headline2">{count}</h2>
      <Button color="secondary" variant="raised" on:click={decrement}><Label>Decrement</Label></Button>
      <Button color="primary" variant="raised" on:click={increment}><Label>Increment</Label></Button>
    </Content>
  </Card>
</div>
