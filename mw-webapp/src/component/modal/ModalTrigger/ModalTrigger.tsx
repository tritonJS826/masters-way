import {PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 */
export const ModalTrigger = (props: PropsWithChildren) => {
  return (
    <DialogTrigger asChild>
      {props.children}
    </DialogTrigger>
  );
};
