import {IconProps} from "src/component/icon/Icon";

/**
 * Check icon
 */
export const CheckIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"

      stroke="currentColor"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

