import {Option, OptionType} from "src/component/select/option/Option";
import styles from "src/component/select/Select.module.scss";

/**
 * Select props
 */
export interface SelectProps {

  /**
   * Label's text
   */
  label: string;

  /**
   * Select`s value
   */
  value: string;

  /**
   * Select's name
   */
  name: string;

  /**
   * Options list
   */
  options: OptionType[];

  /**
   * Callback triggered onChange select value
   */
  onChange: (value: string) => void;
}

/**
 * Represents a control that provides a menu of options
 * @param {SelectProps} props
 */
export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const renderSelectOptions = props.options.map((option) => (
    <Option
      key={option.id}
      value={option.value}
      text={option.text}
    />
  ));

  /**
   * Handle onChange event
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <label>
      {props.label}
      <select
        name={props.name}
        onChange={onChangeHandler}
        className={styles.select}
      >
        {props.value}
        {renderSelectOptions}
      </select>
    </label>
  );
};
