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
   * Secondary button
   */
  SECONDARY = "secondary",

  /**
   * Button that looks like an icon
   */
  ICON_BUTTON = "iconButton",

  /**
   * Button that looks like an icon
   */
  ICON_BUTTON_WITHOUT_BORDER = "iconButtonWithoutBorder",

}

/**
 * Button props
 */
export interface ButtonProps {

  /**
   * Button's value
   */
  value?: string | JSX.Element;

  /**
   * Button's icon
   */
  icon?: JSX.Element;

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
   * @default {@link ButtonType.SECONDARY}
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
  const [isHandleClickInProgress, setHandleClickInProgress] = useState(false);

  /**
   * Handler on button click
   * If callback promise than button will be inactive until promise resolved
   */
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setHandleClickInProgress(true);
    await Promise.resolve(props.onClick(event));
    setHandleClickInProgress(false);
  };

  return (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[props.buttonType ?? ButtonType.SECONDARY],
        props.className,
      )}
      onClick={handleClick}
      aria-label={props.dataCy}
      data-cy={props.dataCy}
      disabled={isHandleClickInProgress || props.isDisabled}
    >
      {props.value}
      {props.icon}
    </button>
  );
});

Button.displayName = "Button";
