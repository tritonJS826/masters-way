import {ReactElement} from "react";
import {Root as FormRoot} from "@radix-ui/react-form";
import {FormField} from "src/component/form/formField/FormField";
import {FormSubmit} from "src/component/form/formSubmit/FormSubmit";
import styles from "src/component/form/Form.module.scss";

interface FormProps{
  /**
 * Form submission button
 */
  buttonSubmit:ReactElement<HTMLElement>;
}

/**
 * The component that create form element
 */
export const Form:React.FC<FormProps> = (props:FormProps) => {

  return(
    <FormRoot className={styles.form}>
      <FormField
        name={"email"}
        labelContent="email"
        messageValueMissing="Please enter your email"
        messageTypeMismatch="Please provide a valid email"
        controlContent={
          <input
            type='email'
            required
          />}
      />
      <FormSubmit>
        {props.buttonSubmit}
      </FormSubmit>
    </FormRoot>
  );
};