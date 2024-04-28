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
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </svg>
  );
};
