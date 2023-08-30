import styles from "src/component/button/Button.module.scss";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

interface ButtonProps {
  /**
   * Button value (text)
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
      id={`${getRandomInt(100)}`}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};