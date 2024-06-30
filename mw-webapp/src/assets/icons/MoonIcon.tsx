import {IconProps} from "src/component/icon/Icon";

/**
 * Moon icon
 */
export const MoonIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
      data-cy={props.dataCy}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />

    </svg>
  );
};
