import React from 'react';
import { observer } from 'mobx-react-lite';

import { Box, Button } from '@mui/material';
import { useStore } from 'host/Store';
import { Counter } from 'react/Counter';
import { render as vueRender } from 'vue/render';
import { render as svelteRender } from 'svelte/render';

export const CounterGame = observer(() => {
  const store = useStore();
  const vueRef = React.useRef<HTMLDivElement | null>(null);
  const svelteRef = React.useRef<HTMLDivElement | null>(null);
  const once = React.useRef(false);
  React.useEffect(() => {
    if (!once.current) {
      vueRender(vueRef.current!);
      svelteRender(svelteRef.current!);
      once.current = true;
    }
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        px: 3,
        pt: 4,
      }}
    >
      <Button variant="contained" onClick={store.counter.increment}>
        Internal increment {store.counter.count}
      </Button>
      <Counter />
      <div ref={vueRef}></div>
      <div ref={svelteRef}></div>
    </Box>
  );
});
