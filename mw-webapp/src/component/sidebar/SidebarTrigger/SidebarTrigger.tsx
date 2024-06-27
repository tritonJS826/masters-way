import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";

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
    >
      <div
        ref={ref}
        role="button"
        aria-label={headerAccessIds.burgerMenu}
      >
        {props.children}
      </div>
    </DialogTrigger>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";
