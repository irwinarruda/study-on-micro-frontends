declare module 'host/Store' {
  const useStore: () => { counter: { count: number; increment: () => void; decrement: () => void } };
  return { useStore };
}
