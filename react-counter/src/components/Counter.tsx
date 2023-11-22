import React from 'react';
import { Button, Typography, Card, colors } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStore } from 'host/Store';

type CounterProps = {
  children?: React.ReactNode;
};

export const Counter = observer(({}: CounterProps) => {
  const { counter } = useStore();

  return (
    <Card sx={{ marginTop: 3, padding: 3, border: '2px solid', borderColor: colors.blue[500] }}>
      <Typography variant="h4">ReactJs Counter</Typography>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {counter.count}
      </Typography>
      <Button variant="contained" color="error" size="medium" onClick={() => counter.decrement()} sx={{ marginTop: 2 }}>
        Decrement
      </Button>
      <Button
        variant="contained"
        color="success"
        size="medium"
        onClick={() => counter.increment()}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Increment
      </Button>
    </Card>
  );
});
