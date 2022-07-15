import React from 'react';

import { Box, Typography } from '@mui/material';

type HomeProps = {
  children?: React.ReactNode;
};

export const Home = ({}: HomeProps) => {
  return (
    <Box>
      <Typography>Hello World</Typography>
    </Box>
  );
};
