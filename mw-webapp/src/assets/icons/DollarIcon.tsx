import {IconProps} from "src/component/icon/Icon";

/**
 * Dollar icon
 */
export const DollarIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        x1="12"
        y1="1"
        x2="12"
        y2="23"
      />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
};
