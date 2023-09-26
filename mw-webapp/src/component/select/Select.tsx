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
        onChange={props.onChange}
        className={styles.select}
      >
        {props.value}
        {renderOption}
      </select>
    </label>
  );
};
