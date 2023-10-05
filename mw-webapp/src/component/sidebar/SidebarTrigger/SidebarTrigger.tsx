import {PropsWithChildren, ReactElement} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

interface SidebarTriggerProps<T> {
  /**
   * The element that triggers the Sidebar when clicked.
   */
  children: ReactElement<T>;
}

/**
 * This component is used to wrap elements that act as triggers to open a Sidebar when clicked.
 */
export const SidebarTrigger = <T extends HTMLElement>(props: PropsWithChildren<SidebarTriggerProps<T>>) => {
  return (
    <DialogTrigger asChild>
      {props.children}
    </DialogTrigger>
  );
};