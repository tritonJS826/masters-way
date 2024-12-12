import {useEffect, useRef} from "react";

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
   * Height from bottom content block when need use callback
   */
  heightFromBottomBlock: number;

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
  heightFromBottomBlock,
  dependency = [],
}: useScrollProps<Dependency>) => {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Handle scroll callback
   */
  const handleScroll = () => {
    if (!ref.current) {
      return;
    }

    const actionPointFromTop = (ref.current.scrollHeight - heightFromBottomBlock);

    const isShouldTriggerCallback = ref.current.scrollTop + ref.current.clientHeight >= actionPointFromTop;

    if (!isDisabled && isShouldTriggerCallback) {
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

