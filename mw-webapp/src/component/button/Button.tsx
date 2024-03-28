import {ForwardedRef, forwardRef, useState} from "react";
import clsx from "clsx";
import styles from "src/component/button/Button.module.scss";

/**
 * Type of button's styles
 */
export enum ButtonType {

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
   * Button's value (content)
   */
  value: string | JSX.Element;

  /**
   * Callback triggered on button click
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Type of button styles
   * @default {@link ButtonType.Secondary}
   */
  buttonType?: ButtonType;

  /**
   * Disabled button does not react on click
   * false by default
   */
  isDisabled?: boolean;

}

/**
 * Button component
 */
export const Button = forwardRef((props: ButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
  const [isDisabled, setIssDisabled] = useState(props.isDisabled ?? false);

  /**
   * Handler on button click
   * If callback promise than button will be inactive until promise resolved
   */
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIssDisabled(true);
    props.onClick(event);
    // Await Promise.resolve(props.onClick(event));
    setIssDisabled(false);
  };

  return (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[props.buttonType ?? ButtonType.SECONDARY],
        {[styles.disabled]: isDisabled},
        props.className,
      )}
      onClick={handleClick}
      data-cy={props.dataCy}
      disabled={isDisabled}
    >
      {props.value}
    </button>
  );
});

Button.displayName = "Button";
