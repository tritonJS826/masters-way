/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMemo} from "react";

type Constructor<StoreInstance> = new (...args: any[]) => StoreInstance;

/**
 * UseStore hook props
 */
interface useStoreProps<
  StoreType extends Constructor<StoreInstance>,
  Dependency extends [...any[]],
  StoreInstance
> {

  /**
   * Data
   */
  dataForInitialization?: ConstructorParameters<StoreType>;

  /**
   *Store for initialize
   */
  storeForInitialize: StoreType;

  /**
   * Dependency array
   */
  dependency?: Dependency;
}

/**
 * Custom hook to memoized useStore
 */
export const useStore = <
  StoreType extends Constructor<StoreInstance>,
  Dependency extends [...any[]],
  StoreInstance
>({
    dataForInitialization,
    storeForInitialize,
    dependency,
  }: useStoreProps<StoreType, Dependency, StoreInstance>): StoreInstance => {

  const store = useMemo(
    () => dataForInitialization
      ? new storeForInitialize(...dataForInitialization)
      : new storeForInitialize(),
    [...(dependency ?? [])],
  );

  return store;
};
