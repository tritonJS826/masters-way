import styles from "src/component/button/Button.module.scss";

interface ButtonProps {
  /**
   * Button's value (text)
   */
  value: string;
  /**
   * Callback triggered on button click
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};