import {IconProps} from "src/component/icon/Icon";

/**
 * MoreVertical icon
 */
export const MoreVertical = (props: IconProps) => {
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
      <circle
        cx="12"
        cy="12"
        r="1"
      />
      <circle
        cx="12"
        cy="5"
        r="1"
      />
      <circle
        cx="12"
        cy="19"
        r="1"
      />
    </svg>
  );
};
