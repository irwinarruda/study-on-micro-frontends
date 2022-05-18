import React from 'react';
import { Card, Typography } from '@mui/material';

type AppProps = {
  children?: React.ReactNode;
};

export const App = ({}: AppProps) => {
  return (
    <Card sx={{ marginTop: 3, padding: 3 }}>
      <Typography variant="h4">ReactJs Header</Typography>
    </Card>
  );
};
