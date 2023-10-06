import {PropsWithChildren} from "react";
import {Submit as SubmitForm} from "@radix-ui/react-form";

/**
 * The component that contains trigger for form submit
 */
export const FormSubmit = (props:PropsWithChildren) => {

  return(
    <SubmitForm
      className={""}
      asChild
    >
      {props.children}
    </SubmitForm>
  );
};