import React from 'react';

import { NavLink } from 'react-router-dom';

import { Box, Typography, Link } from '@mui/material';

type HomeProps = {
  children?: React.ReactNode;
};

export const Home = ({}: HomeProps) => {
  return (
    <Box>
      <Typography>Hello World</Typography>
      <Link component={NavLink} to="/counter">
        Counter
      </Link>
    </Box>
  );
};
