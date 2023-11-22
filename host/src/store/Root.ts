import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { Counter, CounterDefaultValues } from './Counter';

export const Root = types.model({
  counter: Counter,
});

export interface RootStore extends Instance<typeof Root> {}
export interface Root extends SnapshotIn<typeof Root> {}

export const RootDefaultValues: Root = {
  counter: CounterDefaultValues,
};
