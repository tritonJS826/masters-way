import {useState} from "react";
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
}

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const [selected, setSelected] = useState(props.value);
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value);

  return (
    <label>
      {props.label}
      <select
        name={props.name}
        defaultValue={selected}
        onChange={handleOnChange}
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
