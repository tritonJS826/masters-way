import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * This component is used to wrap elements that act as triggers to open a Sidebar when clicked.
 */
export const SidebarTrigger = forwardRef((props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <DialogTrigger asChild>
      <div
        ref={ref}
        role="button"
      >
        {props.children}
      </div>
    </DialogTrigger>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";
