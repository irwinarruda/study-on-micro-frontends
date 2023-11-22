import Counter from '@app/components/Counter.svelte';
import '@app/styles/smui.css';

export function render(element: HTMLElement) {
  new Counter({
    target: element,
  });
}
