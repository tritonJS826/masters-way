import {PropsWithChildren, ReactElement} from "react";
import {Control as ControlForm} from "@radix-ui/react-form";
interface FormControlProps {
  /**
   * Data input element
   */
  children: ReactElement<HTMLElement>;
}

/**
 * The component that contains element for input data
 */
export const FormControl = (props:PropsWithChildren<FormControlProps>) => {

  return (
    <ControlForm asChild>
      {props.children}
    </ControlForm>
  );
};
