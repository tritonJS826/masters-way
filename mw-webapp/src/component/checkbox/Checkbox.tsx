interface CheckboxProps {
  /**
   * Status flag whether the element is checked or not
   */
  checked: boolean;
  /**
  * Label's text
  */
  label: string;
  /**
   * Additional custom class name for the component
  */
  className?: string;
  /**
   * Select`s value
  */
  value: string;
  /**
   * Select's name
  */
  name: string;
  /**
   * The flag sets the element to be required
   */
  required?: boolean;
  /**
   * Callback triggered on checkbox or label click
   */
  onCheckedChange: () => void;
}

const Checkbox = (props : CheckboxProps) => {
  const {className} = props;

  return (
    <label className={className}>
      <input type="checkbox" />
    </label>
  );
};

export {Checkbox};
