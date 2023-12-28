import {useEffect, useState} from "react";

/**
 * Use Load hook Props
 */
interface useLoadProps<Data, Dependencies> {

  /**
   * Callback that is called to fetch data
   */
  loadData: () => Promise<Data>;

  /**
   * Callback that is called to validate data
   */
  validateData?: (data: Data) => boolean;

  /**
   * Callback that is called on fetch and validation success
   */
  onSuccess: (data: Data) => void;

  /**
   * Callback this is called on fetch or validation error
   */
  onError: (error: Error) => void;

  /**
   * Passed array of dependencies to re-fetch and re-validate data
   */
  dependencies: Dependencies[];
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 */
export function useLoad<Data, Dependencies>({
  loadData,
  validateData = () => true,
  onSuccess,
  onError,
  dependencies,
}: useLoadProps<Data, Dependencies>) {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    /**
     * Fetches data using loadData callback, validates it, then updates state if fetch was successful
     */
    async function fetchAndValidateData() {
      try {
        setIsLoading(true);
        const loadedData = await loadData();
        if (!validateData(loadedData)) {
          throw new Error("Data validation failed");
        }

        setData(loadedData);
        onSuccess(loadedData);
      } catch (err) {
        if (err instanceof Error) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndValidateData();
  }, dependencies);

  return {data, setData, isLoading};
}
