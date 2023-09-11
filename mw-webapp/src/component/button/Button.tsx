import styles from "src/component/button/Button.module.scss";

interface ButtonProps {
  /**
   * Button value (text)
   */
  value: string;
  /**
   * Callback triggered on button click
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // onClick: (event?: any) => void;
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