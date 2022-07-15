import React from 'react';
import { ThemeProvider, GlobalStyles, CssBaseline } from '@mui/material';

import { Header } from '@app/components/Header';
import { theme } from '@app/styles/theme';
import { global } from '@app/styles/global';

type AppProps = {
  children?: React.ReactNode;
};

export const App = ({}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={global as any} />
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
};
