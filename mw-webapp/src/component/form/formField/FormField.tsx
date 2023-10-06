import {ReactElement} from "react";
import {Field as FieldForm} from "@radix-ui/react-form";
import {FieldContainer} from "src/component/form/formField/fieldContainer/FieldContainer";
import {FormControl} from "src/component/form/formField/formControl/FormControl";
import styles from "src/component/form/formField/FormField.module.scss";

interface FormFieldProps{
  /**
  * Name attribute for form field
  */
  name: string;
  /**
  * Content for label
  */
  labelContent:string;
  /**
  * Message if you have not entered data in the field
  */
  messageValueMissing:string;
  /**
  * Message if input data is not valid
  */
  messageTypeMismatch:string;
  /**
  * Element for input data
  */
  controlContent:ReactElement<HTMLElement>;
}

/**
 * The component that create field element
 */
export const FormField:React.FC<FormFieldProps> = (props:FormFieldProps) => {

  return(
    <FieldForm
      className={styles.field}
      name={props.name}
    >
      <FieldContainer
        labelContent={props.labelContent}
        messageValueMissing={props.messageValueMissing}
        messageTypeMismatch={props.messageTypeMismatch}
      />
      <FormControl>
        {props.controlContent}
      </FormControl>
    </FieldForm>
  );
};