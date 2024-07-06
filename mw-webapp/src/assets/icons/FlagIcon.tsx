import {IconProps} from "src/component/icon/Icon";

/**
 * Flag icon
 */
export const FlagIcon = (props: IconProps) => {
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
      <path d="M14 24L7 16.5L0 24V0C0 -0.79565 0.210714 -1.55871 0.585786 -2.12132C0.960859 -2.68393 1.46957 -3
        2 -3H12C12.5304 -3 13.0391 -2.68393 13.4142 -2.12132C13.7893 -1.55871 14 -0.79565 14 0V24Z"
      />
    </svg>
  );
};
