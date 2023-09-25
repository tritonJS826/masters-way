import {Option} from "./option/Option";
import styles from "src/component/select/Select.module.scss";

/**
 * Option element for a select component
 */
export interface OptionType {
  /**
   * Option id. Should be unique
   */
  id: string;
  /**
   * Option value
   */
  value: string;
  /**
   * Option`s visible text
   */
  text: string;
}

/**
 * Select component
 */
export interface SelectProps {
  /**
   * Label's text
   */
  label: string;
  /**
   * Default select value
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
   * Default option
   */
  selected: string;
  /**
   * Callback triggered onChange select value
   */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const renderOption = props.options.map((option) => (
    <Option key={option.id}
      value={option.value}
      text={option.text}
    />
  ));

  return (
    <label>
      {props.label}
      <select
        name={props.name}
        defaultValue={props.selected}
        onChange={props.onChange}
        className={styles.select}
      >
        {props.value}
        {renderOption}
      </select>
    </label>
  );
};
