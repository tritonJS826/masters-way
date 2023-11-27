import clsx from "clsx";
import styles from "src/component/button/Button.module.scss";

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
}

/**
 * Button component
 */
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, props.className)}
      onClick={props.onClick}
      data-cy={props.dataCy ?? "button"}
    >
      {props.value}
    </button>
  );
};
