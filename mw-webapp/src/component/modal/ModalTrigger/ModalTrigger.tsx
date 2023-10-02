import {ReactElement} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

interface ModalTriggerProps {
  /**
   * The element that triggers the modal when clicked.
   */
  children: ReactElement<HTMLElement>;
}

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 */
export const ModalTrigger = (props: ModalTriggerProps) => {
  return (<DialogTrigger asChild>
    {props.children}
  </DialogTrigger>);
};
