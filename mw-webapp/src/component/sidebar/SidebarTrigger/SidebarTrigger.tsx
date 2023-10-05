import {PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * This component is used to wrap elements that act as triggers to open a Sidebar when clicked.
 */
export const SidebarTrigger = (props: PropsWithChildren) => {
  return (
    <DialogTrigger asChild>
      {props.children}
    </DialogTrigger>
  );
};