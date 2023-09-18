import {FC, HTMLInputTypeAttribute} from "react";
import cn from "classnames";
import styles from "./Input.module.scss";


interface InputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string | Array<string>;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
  disabled?: boolean;
  required?: boolean;
}

export const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  inputMode,
}) => {
  return (
    <div className={styles.input__wrapper}>
      <label
        className={styles["visually-hidden"]}
      >
        {placeholder}
      </label>
      <input type={type}
        placeholder={placeholder}
        className={cn(styles.input, [className])}
        inputMode={inputMode}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};
