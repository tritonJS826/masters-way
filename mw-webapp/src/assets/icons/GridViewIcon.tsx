import {IconProps} from "src/component/icon/Icon";

/**
 * Grid view icon
 */
export const GridViewIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
      />
    </svg>
  );
};
