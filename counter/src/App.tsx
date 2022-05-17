import React from 'react';
import { Counter } from '@app/components/Counter';

type AppProps = {
  children?: React.ReactNode;
};

export const App = ({}: AppProps) => {
  return <Counter />;
};
