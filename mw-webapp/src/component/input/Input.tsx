import {HTMLInputTypeAttribute} from "react";
import clsx from "clsx";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {InputMode} from "src/component/input/InputMode";
import {ParserInputValue} from "src/component/input/parsers";
import styles from "src/component/input/Input.module.scss";

/**
 * InputIcon
 */
interface InputIcon {

  /**
   * InputIcon name
   */
  name: keyof typeof IconDictionary;

  /**
   * InputIcon size
   */
  size: IconSize;
}

/**
 * Input's props
 */
interface InputProps<T extends string | number> {

  /**
   * Input's value
   */
  value: T;

  /**
   * Input's type (what type of value is expected)
   * @default "text"
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Input's placeholder text
   */
  placeholder?: string;

  /**
   * Input's class
   */
  className?: string | Array<string>;

  /**
   * Input's mode (defines what kind of input mode browser should present to the user)
   * @default: {@link InputMode.text}
   */
  inputMode?: InputMode;

  /**
   * The input is un-clickable and unusable if true
   * @default false
   */
  disabled?: boolean;

  /**
   * The input must be filled out if true
   * @default false
   */
  required?: boolean;

  /**
   * Automatically focused on input after rendering if true
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Maximum value for input type "number"
   */
  max?: number;

  /**
   * Minimum value for input type "number"
   */
  min?: number;

  /**
   * Tracks the value entered into the input
   */
  onChange: (value: T) => void;

  /**
   * Formatting value
   */
  formatter?: (value: T) => T;

  /**
   * Parsing formatted value
   */
  parser?: (value: string) => T;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * TypeInputIcon
   */
  typeInputIcon?: InputIcon;
}

/**
 * Input component
 */
export const Input = <T extends string | number>(props: InputProps<T>) => {

  /**
   * Event handler for the input change event
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let parsedValue: T;

    switch (props.type) {
      case "number": {
        parsedValue = props.parser
          ? props.parser(event.target.value)
          : ParserInputValue.defaultNumberParser(event.target.value);
        break;
      }
      case "string":
      default: {
        parsedValue = props.parser
          ? props.parser(event.target.value)
          : ParserInputValue.defaultTextParser(event.target.value);
        break;
      }
    }
    props.onChange(parsedValue);
  };

  return (
    <div className={styles.inputWrapper}>
      {props.typeInputIcon && (
        <Icon
          size={props.typeInputIcon.size}
          name={props.typeInputIcon.name}
          className={styles.inputIcon}
        />
      )}
      <input
        value={props.formatter ? props.formatter(props.value) : props.value}
        type={props.type ?? "text"}
        max={props.max}
        min={props.min}
        placeholder={props.placeholder}
        className={clsx(styles.input, props.className, props.typeInputIcon && styles.inputFilter)}
        inputMode={props.inputMode}
        disabled={!!props.disabled}
        required={!!props.required}
        autoFocus={!!props.autoFocus}
        onChange={onChange}
        data-cy={props.dataCy}
      />
    </div>
  );
};
