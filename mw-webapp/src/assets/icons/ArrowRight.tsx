import {IconProps} from "src/component/icon/Icon";

/**
 * Arrow right icon
 */
export const ArrowRightIcon = (props: IconProps) => {
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
        x1="5"
        y1="12"
        x2="19"
        y2="12"
      />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
};
