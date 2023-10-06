import {FormLabel} from "src/component/form/formField/fieldContainer/formLabel/FormLabel";
import {FormMessage} from "src/component/form/formField/fieldContainer/formMessage/FormMessage";
import styles from "src/component/form/formField/fieldContainer/FieldContainer.module.scss";

interface FieldContainerProps{
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
}

/**
 * Component contains label,messages for input data
 */
export const FieldContainer:React.FC<FieldContainerProps> = (props:FieldContainerProps) => {

  return(
    <div className={styles.container}>
      <FormLabel>
        {props.labelContent}
      </FormLabel>
      <FormMessage match={"valueMissing"}>
        {props.messageValueMissing}
      </FormMessage>
      <FormMessage match={"typeMismatch"}>
        {props.messageTypeMismatch}
      </FormMessage>
    </div>
  );
};