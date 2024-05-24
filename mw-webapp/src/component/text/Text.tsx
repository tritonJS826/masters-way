import {ReactElement} from "react";

/**
 * Params for {@link Text}
 */
interface TextProps {

  /**
   * Displayed values
   */
  value: string | number;

  /**
   * Displayed placeholder
   */
  placeholder: string;

  /**
   * Function to render value
   */
  renderValue: (value: string | number) => ReactElement;

  /**
   * Function to render placeholder
   */
  renderPlaceholder: (placeholder: string) => ReactElement;
}

/**
 * Component Text
 */
export const Text = (props: TextProps) => {
  const {
    placeholder,
    value,
    renderPlaceholder,
    renderValue,
  } = props;

  return (
    <span>
      {value.toString().trim() === "" ? renderPlaceholder(placeholder) : renderValue(value)}
    </span>
  );
};
