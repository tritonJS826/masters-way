import {useEffect} from "react";
import {dictionaryStore} from "src/globalStore/DictionaryStore";
import {LanguageService} from "src/service/LanguageService";

/**
 * Custom hook to preload dictionary
 */
export const useLazyDictionary = () => {
  const {state} = dictionaryStore;

  useEffect(() => {

    /**
     * Pre-load mentors landing dictionary
     */
    const preloadDictionary = async () => {
      await LanguageService.preloadMentorsLanding();
    };

    preloadDictionary();
  }, []);

  return {state};

};
