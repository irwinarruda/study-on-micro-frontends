import { Instance, SnapshotIn, types } from 'mobx-state-tree';

export const Counter = types
  .model({
    count: types.number,
  })
  .actions(self => ({
    increment() {
      self.count++;
    },
    decrement() {
      self.count--;
    },
  }));

export interface ICounterStore extends Instance<typeof Counter> {}
export interface ICounter extends SnapshotIn<typeof Counter> {}

export const CounterDefaultValues: ICounter = {
  count: 0,
};
