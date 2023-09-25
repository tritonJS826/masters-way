
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
* Option component
*/
interface OptionProps{
  /**
   * Unique value
   */
  key: string;
  /**
   * Option`s value
   */
  value: string;
  /**
   * Inner option text
   */
  text: string;
}
export const Option: React.FC<OptionProps> = (props: OptionProps) => {
  return(
    <option
      key={props.key}
      value={props.value}
    >
      {props.text}
    </option>
  );
};