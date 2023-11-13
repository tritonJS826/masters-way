import {ReactElement, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {SidebarContent} from "src/component/sidebar/SidebarContent/SidebarContent";
import {SidebarTrigger} from "src/component/sidebar/SidebarTrigger/SidebarTrigger";

/**
 * Sidebar props
 */
interface SidebarProps {

  /**
   * The element that triggers the Sidebar.
   */
  trigger: ReactElement<HTMLElement>;

  /**
   * The content to display within the Sidebar.
   */
  content: ReactElement<HTMLElement>;
}

/**
 * Sidebar component
 */
export const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <DialogRoot
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarTrigger>
        {props.trigger}
      </SidebarTrigger>
      <SidebarContent>
        {props.content}
      </SidebarContent>
    </DialogRoot>
  );
};
