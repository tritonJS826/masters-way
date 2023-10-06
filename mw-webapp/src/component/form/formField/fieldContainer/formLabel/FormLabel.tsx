import {PropsWithChildren} from "react";
import {Label as LabelForm} from "@radix-ui/react-form";
import styles from "src/component/form/formField/formLabel/FormLabel.module.scss";


interface FormLabelProps{
  /**
  * Form label text
  */
  children:string;
}

/**
  * Form label component
  */
export const FormLabel:React.FC<FormLabelProps> = (props:PropsWithChildren<FormLabelProps>) => {

  return(
    <LabelForm className={styles.label}>
      {props.children}
    </LabelForm>
  );
};