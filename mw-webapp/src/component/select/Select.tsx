import {Option, OptionType} from "src/component/select/option/Option";
import styles from "src/component/select/Select.module.scss";

/**
 * Select props
 */
export interface SelectProps<T> {

  /**
   * Label's text
   */
  label: string;

  /**
   * Select`s value
   */
  value: T;

  /**
   * Select's name
   */
  name: string;

  /**
   * Options list
   */
  options: OptionType<T>[];

  /**
   * Callback triggered onChange select value
   */
  onChange: (value: T) => void;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Represents a control that provides a menu of options
 */
export const Select = <T extends string | number>(props: SelectProps<T>) => {
  const renderSelectOptions = props.options.map((option) => (
    <Option
      key={option.id}
      value={option.value}
      text={option.text}
    />
  ));

  /**
   * Handle onChange event
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as T;
    props.onChange(selectedValue);
  };

  return (
    <label>
      {props.label}
      <select
        name={props.name}
        onChange={onChangeHandler}
        className={styles.select}
        defaultValue={props.value}
        data-cy={props.dataCy}
      >
        {renderSelectOptions}
      </select>
    </label>
  );
};
