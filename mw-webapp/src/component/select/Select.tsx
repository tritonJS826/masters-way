import {Option, OptionType} from "src/component/select/option/Option";
import styles from "src/component/select/Select.module.scss";

/**
 * Select props
 */
export interface SelectProps<T> {

  /**
   * Label's text
   */
  label?: string;

  /**
   * Select`s default value (does not depend on external state)
   */
  defaultValue?: T;

  /**
   * Select's value
   */
  value?: T;

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
 * Render list of options for select component
 */
const renderSelectOptions = <T extends string | number>(options: OptionType<T>[]) => options.map((option) => (
  <Option
    key={option.id}
    value={option.value}
    text={option.text}
  />
));

/**
 * Represents a control that provides a menu of options
 */
export const Select = <T extends string | number>(props: SelectProps<T>) => {

  /**
   * Handle onChange event
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as T;
    props.onChange(selectedValue);
  };

  return (
    <label className={styles.selectContainer}>
      {props.label}
      <select
        name={props.name}
        onChange={onChangeHandler}
        className={styles.select}
        defaultValue={props.defaultValue}
        value={props.value}
        data-cy={props.dataCy}
      >
        {renderSelectOptions(props.options)}
      </select>
    </label>
  );
};
