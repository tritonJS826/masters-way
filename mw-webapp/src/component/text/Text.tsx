import clsx from "clsx";
import styles from "src/component/text/Text.module.scss";

/**
 * Type of  text variant styles
 */

export type ThemeVariant = "clear" | "outline";

/**
 * Type of size text styles
 */

export type TextSize = "m" | "l" | "xl";

/**
 * Params for {@link Text}
 */
interface TextProps {

  /**
   * Displayed text
   */
  text: string | number;

  /**
   * Displayed size text
   */
  size?: TextSize;

  /**
   * Displayed variant theme text
   */
  variant?: ThemeVariant;

  /**
   * Data attributes for cypress testing
   */
  cy?: string;
}

/**
 * Component Text
 */
export const Text = (props: TextProps) => {
  return (
    <div data-cy={props.cy}>
      {props.text &&
      <p className={clsx(
        styles.Text,
        props.size && styles[props.size],
        props.variant && styles[props.variant],
      )}
      >
        {props.text}
      </p>
      }
    </div>
  );
};
