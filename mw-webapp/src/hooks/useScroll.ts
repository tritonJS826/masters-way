import {useEffect, useRef} from "react";

const HEIGHT_FROM_BOTTOM_POSITION = 10;

/**
 * Use Scroll hook Props
 */
interface useScrollProps<Dependency> {

  /**
   * Callback that is called to fetch data
   */
  onScroll: () => void;

  /**
   * Is more element exist and need call callback
   */
  isMoreElementExist: boolean;

  /**
   * Dependency array to re-fetch and re-validate data
   */
  dependency?: Dependency[];
}

/**
 * Custom hook to fetch, validate, and manage the state of data
 */
export const useScroll = <Dependency>({
  onScroll,
  isMoreElementExist,
  dependency = [],
}: useScrollProps<Dependency>) => {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Handle scroll callback
   */
  const handleScroll = () => {
    if (isMoreElementExist
      && ref.current
      && (ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight) <= HEIGHT_FROM_BOTTOM_POSITION
    ) {
      onScroll();
    }
  };

  useEffect(() => {

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };

  }, dependency);

  return {ref};
};

