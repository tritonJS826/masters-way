import {IconProps} from "src/component/icon/Icon";

/**
 * UserCheck icon
 */
export const UserCheckIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      data-cy={props.dataCy}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle
        cx="8.5"
        cy="7"
        r="4"
      />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  );
};
