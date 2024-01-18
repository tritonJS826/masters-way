/**
 * Option type for a select component
 */
export interface OptionType {

  /**
   * Option`s id. Should be unique
   */
  id: string;

  /**
   * Option`s value
   */
  value: string;

  /**
   * Option`s visible text
   */
  text: string;
}

/**
 * Option props
 */
interface OptionProps {

  /**
   * Option`s value
   */
  value: string;

  /**
   * Inner option text
   */
  text: string;
}

/**
 * Element of Select
 */
export const Option = (props: OptionProps) => {
  return (
    <option value={props.value}>
      {props.text}
    </option>
  );
};
