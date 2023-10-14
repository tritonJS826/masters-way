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
}

/**
 * Button component
 */
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
