import React, {useEffect} from "react";

/**
 *Custom hook to useClickOutside
 */
export const useClickOutside = (
  refElem: React.RefObject<HTMLUListElement>,
  callback: () => void,
) => {

  /**
   *HandleClickOutside
   */
  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (refElem.current && !refElem.current?.contains(target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  });
};
