import {useEffect, useState} from "react";

/**
 * Use Load hook Props
 */
interface useLoadProps<T, D> {

  /**
   * Callback that is called to fetch data
   */
  loadData: () => Promise<T>;

  /**
   * Callback that is called to validate data
   */
  validateData?: (data: T) => boolean;

  /**
   * Callback that is called on fetch and validation success
   */
  onSuccess: (data: T) => void;

  /**
   * Callback this is called on fetch or validation error
   */
  onError?: (error: Error) => void;

  /**
   * Passed dependency to refetch and revalidate data
   */
  dependency?: D;
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 */
export function useLoad<T, D>({
  loadData,
  validateData = () => true,
  onSuccess,
  onError = () => {},
  dependency = undefined,
}: useLoadProps<T, D>) {
  const [data, setData] = useState<T>();
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
  }, [dependency]);

  return {data, setData, isLoading};
}
