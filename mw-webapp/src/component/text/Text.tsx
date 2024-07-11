import {renderMarkdown} from "src/utils/markdown/renderMarkdown";

/**
 * Enum of text type styles
 */
export enum TextType {
  DEFAULT = "default"
}

/**
 * Text props
 */
interface TextProps {

  /**
   * Displayed text
   */
  text: string | number;

  /**
   * Displayed type theme text
   * @default {@link TextType}
   */
  textType?: TextType.DEFAULT;

  /**
   * Data attributes for cypress testing
   */
  cy?: string;

  /**
   * Custom class for the Text.
   */
  className?: string;
}

/**
 * Text component
 */
export const Text = (props: TextProps) => {

  return (
    <div
      className={props.className}
      data-cy={props.cy}
    >
      {renderMarkdown(props.text)}
    </div>
  );
};
