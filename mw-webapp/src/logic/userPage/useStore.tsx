/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMemo} from "react";

/**
 * UseStore hook props
 */
interface useStoreProps<StoreType extends new (...args: any) => any, Dependency> {

  /**
   * Data
   */
  dataForInitialization?: ConstructorParameters<StoreType>;

  /**
   * Sdf
   */
  storeForInitialize: StoreType;

  /**
   * Dependency array
   */
  dependency?: Dependency[];
}

/**
 * Custom hook to memoized useStore
 */
export const useStore = <StoreType extends new (...args: any) => any, Dependency>({
  dataForInitialization,
  storeForInitialize,
  dependency = [],
}: useStoreProps<StoreType, Dependency>) => {

  const userPageOwner = useMemo(() => new storeForInitialize(dataForInitialization), dependency);

  return userPageOwner;
};
