import {IconProps} from "src/component/icon/Icon";

/**
 * Minus icon
 */
export const MinusIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      data-cy={props.dataCy}
    >
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
      />
    </svg>
  );
};
