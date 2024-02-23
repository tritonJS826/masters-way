import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {Link} from "src/component/link/Link";
import {SidebarContent} from "src/component/sidebar/SidebarContent/SidebarContent";
import {SidebarTrigger} from "src/component/sidebar/SidebarTrigger/SidebarTrigger";
import styles from "src/component/sidebar/Sidebar.module.scss";

/**
 * Navigation link props.
 */
export interface NavigationLink {

  /**
   * Navigation link path.
   */
  path: string;

  /**
   * Navigation link value.
   */
  value: string;

  /**
   * Is link visible
   * @default false
   */
  isHidden?: boolean;
}

/**
 * Sidebar props
 */
interface SidebarProps {

  /**
   * The element that triggers the Sidebar.
   */
  trigger: ReactElement<HTMLElement>;

  /**
   * List of available links from menu
   */
  linkList: NavigationLink[];
}

/**
 * Renders navigation links based on the provided navigationLinks array.
 */
const renderNavigationLinks = (navigationLinks: (NavigationLink)[]) => {
  return navigationLinks.map((item) => (
    !item.isHidden && (
      <Link
        key={item.value}
        path={item.path}
        className={styles.menuItem}
      >
        {item.value}
      </Link>
    )
  ));
};

/**
 * Sidebar component
 */
export const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarTrigger>
        {props.trigger}
      </SidebarTrigger>

      <SidebarContent onClick={() => setOpen(false)}>
        <div className={styles.navSidebarContent}>
          {renderNavigationLinks(props.linkList)}
        </div>
      </SidebarContent>
    </DialogRoot>
  );
};
