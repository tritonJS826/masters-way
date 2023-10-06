import {PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 * @param {PropsWithChildren} props
 * @returns {JSX.Element}
 */
export const ModalTrigger = (props: PropsWithChildren): JSX.Element => {
  return (
    <DialogTrigger asChild>
      {props.children}
    </DialogTrigger>
  );
};
