import {useEffect, useRef} from "react";

const HEIGHT_FROM_BOTTOM_POSITION = 10;

/**
 * Use Scroll hook Props
 */
interface useScrollProps<Dependency> {

  /**
   * Callback that is called when scroll has bottom position
   */
  onScroll: () => void;

  /**
   * If true then callback on scroll is not allowed if false - then callback is allowed
   */
  isDisabled: boolean;

  /**
   * Dependency array to re-add listener
   */
  dependency?: Dependency[];
}

/**
 * Custom hook to manage callback according scroll position inside the block
 */
export const useScroll = <Dependency>({
  onScroll,
  isDisabled,
  dependency = [],
}: useScrollProps<Dependency>) => {
  const ref = useRef<HTMLDivElement>(null);

  const isScrollAtBottom = ref.current
  && (ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight) <= HEIGHT_FROM_BOTTOM_POSITION;

  /**
   * Handle scroll callback
   */
  const handleScroll = () => {
    if (!isDisabled && isScrollAtBottom) {
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

