
interface OptionProps{
  key: string;
  value: string;
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