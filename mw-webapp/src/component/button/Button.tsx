import clsx from "clsx";
import styles from "src/component/button/Button.module.scss";

/**
 * Type of button's styles
 */
export enum ButtonsType {

  /**
   * Important button
   */
  PRIMARY = "primary",

  /**
   * Common repetitive button type 1
   */
  SECONDARY = "secondary",

  /**
   * Rare unique button type 2
   */
  TERTIARY = "tertiary",
}

/**
 * Button props
 */
export interface ButtonProps {

  /**
   * Button's value (text)
   */
  value: string;

  /**
   * Callback triggered on button click
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * Type of button styles
   * @default StylesType.Secondary
   */
  buttonType?: ButtonsType;
}

/**
 * Button component
 */
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[props.buttonType ?? ButtonsType.SECONDARY], props.className)}
      onClick={props.onClick}
      data-cy={props.dataCy}
    >
      {props.value}
    </button>
  );
};
