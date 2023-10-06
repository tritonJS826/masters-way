import {Message as MessageForm} from "@radix-ui/react-form";
import styles from "src/component/form/formField/formMessage/FormMessage.module.scss";

interface FormMessageProps{
  /**
  * Text for form message
  */
  children:string;
  /**
  * Input form data matching
  */
  match:"valueMissing"|"typeMismatch";
}

/**
 * The component that create form element
 */
export const FormMessage = (props:FormMessageProps) => {

  return(
    <MessageForm
      className={styles.message}
      match={props.match}
    >
      {props.children}
    </MessageForm>
  );
};