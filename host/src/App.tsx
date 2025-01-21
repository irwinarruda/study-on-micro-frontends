import React from 'react';
import { ThemeProvider, GlobalStyles, CssBaseline } from '@mui/material';

import { Router } from '@app/router';
import { theme } from '@app/styles/theme';
import { global } from '@app/styles/global';

type AppProps = {
  children?: React.ReactNode;
};

export const App = ({}: AppProps) => {
  const [shouldGo, setShouldGo] = React.useState(false);
  if (!shouldGo) {
    return <button onClick={() => setShouldGo(true)}>Click here</button>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <GlobalStyles styles={global as any} />
      <CssBaseline />
    </ThemeProvider>
  );
};
