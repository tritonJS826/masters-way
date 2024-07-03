import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * SidebarTrigger props
 */
interface SidebarTriggerProps {

  /**
   * Data attribute for cypress testing
   */
  dataCyTrigger?: string;

}

/**
 * This component is used to wrap elements that act as triggers to open a Sidebar when clicked.
 */
export const SidebarTrigger = forwardRef((props: PropsWithChildren<SidebarTriggerProps>, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <DialogTrigger
      data-cy={props.dataCyTrigger}
      asChild
      aria-label="Navigation menu"
    >
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
