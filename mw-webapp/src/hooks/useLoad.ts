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
   * Callback that is called to fetch data amount
   */
  loadAmount?: () => Promise<number>;

  /**
   * Callback that is called to validate data
   */
  validateData?: (data: Data) => boolean;

  /**
   * Callback that is called on fetch and validation success
   */
  onSuccess: (data: Data, amount?: number) => void;

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
 */
export const useLoad = <Data, Dependency>({
  loadData,
  loadAmount,
  validateData = () => true,
  onSuccess,
  onError,
  dependency = [],
}: useLoadProps<Data, Dependency>) => {
  const [data, setData] = useState<Data>();
  const [amount, setAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    /**
     * Fetches data using loadData callback, validates it, then updates state if fetch was successful
     */
    async function fetchAndValidateData() {
      try {
        setIsLoading(true);
        const loadedData = await loadData();
        const loadedAmount = loadAmount && await loadAmount();
        if (!validateData(loadedData)) {
          throw new Error("Data validation failed");
        }

        setData(loadedData);
        setAmount(loadedAmount);
        onSuccess(loadedData, loadedAmount);
      } catch (err) {
        if (err instanceof Error) {
          onError(err);
          throw err;
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndValidateData();
  }, dependency);

  return {data, setData, amount, setAmount, isLoading};
};
