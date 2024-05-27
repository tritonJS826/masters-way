/**
 * Enum of  text variant styles
 */

/**
 * Displayed type theme text
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
}

/**
 * Text component
 */
export const Text = (props: TextProps) => {
  return (
    <div data-cy={props.cy}>
      {props.text}
    </div>
  );
};
