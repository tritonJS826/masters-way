import {IconProps} from "src/component/icon/Icon";

/**
 * Remove icon
 */
export const RemoveIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M12 4L4 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
