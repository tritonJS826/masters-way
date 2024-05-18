import {IconProps} from "src/component/icon/Icon";

/**
 * Plus icon
 */
export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
      data-cy={props.dataCy}
    >
      <circle
        cx="12"
        cy="12"
        r="11.6"
      />
      <path
        d="M12 8V16"
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7.3335 12H16.6668"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
