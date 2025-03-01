import {useEffect, useState} from "react";
import {LocalStorageData, localStorageWorker} from "src/utils/LocalStorageWorker";

type usePersistenceStateParams<T extends keyof LocalStorageData> = {

  /**
   * Persistent value
   * Default value will be returned if
   * there is no value in the store OR {@link storeDataValidator} return false
   */
  defaultValue: LocalStorageData[T];

  /**
   * Unique Key for current persistent value.
   */
  key: T;

  /**
   * Used to validate stored data,
   * {@link defaultValue} will be returned if validation will not be successful
   * (helpful when trying to work with deprecated data)
   */
  storedDataValidator?: (param: LocalStorageData[T]) => boolean;

  /**
   * Dependencies
   */
  dependencies?: unknown[];
};

/**
 * Hook allows to have persistent state (persistent between sessions)
 */
export const usePersistenceState = <
  T extends keyof LocalStorageData
>(params: usePersistenceStateParams<T>): [

  /**
   * Persistent value
   */
  LocalStorageData[T],

  /**
   * Set persistent value
   */
  (newValue: LocalStorageData[T]) => void,

  /**
   * Update persistent value partially
   */
  (newValue: Partial<LocalStorageData[T]>) => void
] => {

  const storedValue = localStorageWorker.getItemByKey<LocalStorageData[T]>(params.key) ?? params.defaultValue;
  const validateData = params.storedDataValidator ?? (() => true);
  const validatedStoredValue = validateData(storedValue as LocalStorageData[T])
    ? storedValue
    : params.defaultValue;
  if (!validateData(storedValue)) {
    localStorageWorker.setItemByKey(params.key, params.defaultValue);
  }

  const [value, setValue] = useState(validatedStoredValue);

  /**
   * Set persistent value
   */
  const setPersistenceValue = (newValue: LocalStorageData[T]) => {
    setValue(newValue);
    localStorageWorker.setItemByKey(params.key, newValue);
  };

  useEffect(() => {
    setValue(validatedStoredValue);
  }, params.dependencies ?? []);

  /**
   * Update persistent value partially
   */
  const updatePersistentValue = (newPartialValue: Partial<LocalStorageData[T]>) => {
    if (typeof newPartialValue !== "object" || Array.isArray(newPartialValue)) {
      throw new Error("Partial persistent value should be an object");
    }
    const updatedValue = {...value as object, ...newPartialValue};
    localStorageWorker.setItemByKey(params.key, updatedValue as LocalStorageData[T]);

    setValue(updatedValue as LocalStorageData[T]);
  };

  return [
    value as LocalStorageData[T],
    setPersistenceValue,
    updatePersistentValue,
  ];
};
