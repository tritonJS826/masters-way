import styles from "src/component/button/Button.module.scss";

/**
 * Button props
 */
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

/**
 * Button component
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
export const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};