import { Root, RootStore, RootDefaultValues } from '@app/store/Root';

let _store: RootStore;
export function useStore() {
  if (!_store) {
    _store = Root.create(RootDefaultValues);
  }
  return _store;
}
