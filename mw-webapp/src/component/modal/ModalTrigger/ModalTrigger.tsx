import {PropsWithChildren, ReactElement} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

interface ModalTriggerProps<T> {
  /**
   * The element that triggers the modal when clicked.
   */
  children: ReactElement<T>;
}

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 */
export const ModalTrigger = <T extends HTMLElement>(props: PropsWithChildren<ModalTriggerProps<T>>) => {
  return (<DialogTrigger asChild>
    {props.children}
  </DialogTrigger>);
};
