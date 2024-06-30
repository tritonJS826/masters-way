
import {IconProps} from "src/component/icon/Icon";

/**
 * Burger menu icon
 */
export const BurgerMenu = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
      data-cy={props.dataCy}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12H21" />
      <path d="M3 6H21" />
      <path d="M3 18H21" />
    </svg>
  );
};
