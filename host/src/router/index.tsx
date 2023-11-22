import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const CounterGame = React.lazy(async () => ({
  default: (
    await import(
      /* webpackPrefetch: true */
      /* webpackChunkName: 'CounterGame' */
      '@pages/CounterGame'
    )
  ).CounterGame,
}));

const Home = React.lazy(async () => ({
  default: (
    await import(
      /* webpackPrefetch: true */
      /* webpackChunkName: 'Home' */
      '@pages/Home'
    )
  ).Home,
}));

export const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback="loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterGame />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
