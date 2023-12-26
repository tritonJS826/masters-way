import {useEffect, useState} from "react";

/**
 * Use Load hook Props
 */
interface useLoadProps<DataType, DependencyType> {

  /**
   * Callback that is called to fetch data
   */
  loadData: () => Promise<DataType>;

  /**
   * Callback that is called to validate data
   */
  validateData?: (data: DataType) => boolean;

  /**
   * Callback that is called on fetch and validation success
   */
  onSuccess: (data: DataType) => void;

  /**
   * Callback this is called on fetch or validation error
   */
  onError?: (error: Error) => void;

  /**
   * Passed dependencies to re-fetch and re-validate data
   */
  dependencies: DependencyType[];
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 */
export function useLoad<DataType, DependencyType>({
  loadData,
  validateData = () => true,
  onSuccess,
  onError = () => {
  },
  dependencies,
}: useLoadProps<DataType, DependencyType>) {
  const [data, setData] = useState<DataType>();
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
