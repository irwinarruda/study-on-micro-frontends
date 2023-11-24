declare module 'svelte/render' {
  const render: (element: string | Element) => void;
  return { render };
}
