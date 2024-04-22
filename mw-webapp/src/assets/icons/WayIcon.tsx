import {IconProps} from "src/component/icon/Icon";

/**
 * Way icon
 */
export const WayIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >

      <line
        x1="22"
        y1="2"
        x2="11"
        y2="13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="22 2 15 22 11 13 2 9 22 2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
