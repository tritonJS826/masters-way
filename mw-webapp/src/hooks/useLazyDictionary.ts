import {DictionaryStore} from "src/globalStore/dictionaryStore";
import {useStore} from "src/hooks/useStore";
import {DictionaryKey} from "src/service/AsyncLanguageService";

/**
 * Wrap around useStore to lazyLoad dictionary
 */
export const useLazyDictionaries = <T extends readonly DictionaryKey[]> (...dictionaryKeys: T) => {
  const dictionaries = dictionaryKeys.map((dictionaryKey) => {
    const store = useStore<
       new (key: DictionaryKey) => DictionaryStore<DictionaryKey>, [DictionaryKey], DictionaryStore<DictionaryKey>>({
         storeForInitialize: DictionaryStore,
         dataForInitialization: [dictionaryKey],
       });

    return {
      dictionary: store,
      isLoading: !store.isInitialized,
    };
  });

  return {

    /**
     * Using type assertion because map infer union type and typescript doesn't know which dictionary is going to be return
     */
    dictionaries: dictionaries.map(item => item.dictionary) as {
      [K in keyof T]: DictionaryStore<T[K]>
    },
    areAllLoaded: dictionaries.every(item => !item.isLoading),
  };
};
