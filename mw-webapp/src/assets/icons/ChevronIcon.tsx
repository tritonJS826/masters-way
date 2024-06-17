import {IconProps} from "src/component/icon/Icon";

/**
 * Chevron icon
 */
export const ChevronIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path 
        d="M6.5 9L12.5 15L18.5 9" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};


