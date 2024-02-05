/**
 * Option type for a select component
 */
export interface OptionType<T> {

  /**
   * Option`s id. Should be unique
   */
  id: string;

  /**
   * Option`s value
   */
  value: T;

  /**
   * Option`s visible text
   */
  text: string;
}

/**
 * Option props
 */
interface OptionProps<T> {

  /**
   * Option`s value
   */
  value: T;

  /**
   * Inner option text
   */
  text: string;
}

/**
 * Element of Select
 */
export const Option = <T extends string | number>(props: OptionProps<T>) => {
  return (
    <option value={props.value}>
      {props.text}
    </option>
  );
};
