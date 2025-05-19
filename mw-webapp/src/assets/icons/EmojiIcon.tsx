import {IconProps} from "src/component/icon/Icon";

/**
 * Emoji icon
 */
export const EmojiIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={props.className}
      data-cy={props.dataCy}
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line
        x1="8.5"
        y1="9"
        x2="9.5"
        y2="9"
      />
      <line
        x1="14.5"
        y1="9"
        x2="15.5"
        y2="9"
      />
    </svg>
  );
};
