import {useEffect, useState} from "react";

/**
 * Use Load hook Props
 */
interface useLoadProps<Data, Dependency> {

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
   * Dependency array to re-fetch and re-validate data
   */
  dependency?: Dependency[];
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 * @deprecated Need to use load instead useLoad. Was used with react state but after used mobX it's nt needed
 */
export const useLoad = <Data, Dependency>({
  loadData,
  validateData = () => true,
  onSuccess,
  onError,
  dependency = [],
}: useLoadProps<Data, Dependency>) => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

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
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndValidateData();

  }, dependency);

  if (error) {
    onError(error);
  }

  return {data, setData, isLoading};
};

/**
 * Load props
 */
interface loadProps<Data> {

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
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 */
export const load = async <Data>({
  loadData,
  validateData = () => true,
  onSuccess,
  onError,
}: loadProps<Data>) => {

  /**
   * Fetch and validate data
   */
  async function fetchAndValidateData() {
    try {
      const loadedData = await loadData();
      if (!validateData(loadedData)) {
        throw new Error("Data validation failed");
      }
      onSuccess(loadedData);
    } catch (err) {
      if (err instanceof Error) {
        onError(err);
      }
    }
  }

  await fetchAndValidateData();
};
