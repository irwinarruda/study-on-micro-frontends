import React from 'react';

import { Box, Button, Typography, Card } from '@mui/material';
import { Counter } from 'header/Counter';
import { render } from 'form/render';

export const Home = () => {
  const vueRef = React.useRef<HTMLDivElement | null>(null);
  const once = React.useRef(false);
  React.useEffect(() => {
    if (!once.current) {
      render(vueRef.current!);
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
    </Box>
  );
};
