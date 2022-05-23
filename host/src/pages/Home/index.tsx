import React from 'react';

import { Box } from '@mui/material';
import { Counter } from 'header/Counter';
import { render as vueRender } from 'form/render';
import { render as svelteRender } from 'games/render';

export const Home = () => {
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
        paddingX: 3,
      }}
    >
      <Counter />
      <div ref={vueRef}></div>
      <div ref={svelteRef}></div>
    </Box>
  );
};
