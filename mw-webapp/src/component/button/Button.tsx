import clsx from "clsx";
import styles from "src/component/button/Button.module.scss";

/**
 * Type of button's styles
 */
export enum StylesType {

  /**
   * Use for important button
   */
  PRIMARY = "primary",

  /**
   * Use for common repetitive button
   */
  SECONDARY = "secondary",

  /**
   * Use for rare unique button
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
  styleType?: StylesType;
}

/**
 * Button component
 */
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[props.styleType ?? StylesType.SECONDARY], props.className)}
      onClick={props.onClick}
      data-cy={props.dataCy}
    >
      {props.value}
    </button>
  );
};
