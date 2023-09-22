import styles from "src/component/select/Select.module.scss";

// Implement an option element for a select component
export interface OptionType {
  id: string;
  value: string;
  text: string;
}

// Implement a simple select component
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
   * Default value for select
   */
  selected: string;
  /**
   * Callback triggered onChange select value
   */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
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
        {props.options.map((option) => (
          <option key={option.id}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
};
