import {PropsWithChildren} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {CyContent} from "src/component/sidebar/Sidebar";
import styles from "src/component/sidebar/SidebarContent/SidebarContent.module.scss";

/**
 * SidebarContent props
 */
interface SidebarContentProps extends PropsWithChildren {

  /**
   * Callback triggered on SidebarContent click
   */
  onLinkClick: () => void;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

  /**
   * Class name
   */
  className: string;

}

/**
 * A container for the content to be displayed within a Sidebar.
 */
export const SidebarContent = (props: SidebarContentProps) => {

  /**
   * Handle onClick event
   */
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    let target: HTMLElement | null = event.target as HTMLElement;

    while (target && target !== event.currentTarget) {
      if (target instanceof HTMLAnchorElement) {
        props.onLinkClick();
        break;
      }
      target = target.parentElement;
    }
  };

  return (
    <DialogPortal>
      <DialogOverlay
        data-cy={props.dataCyContent?.dataCyOverlay}
        className={styles.dialogOverlay}
      />
      <DialogContent
        data-cy={props.dataCyContent?.dataCyContent}
        className={clsx(styles.dialogContent, props.className)}
        onClick={onClickHandler}
      >
        {props.children}
        <DialogClose asChild>
          <Button
            dataCy={props.dataCyContent?.dataCyClose}
            className={styles.closeButton}
            buttonType={ButtonType.ICON_BUTTON}
            icon={<Cross2Icon />}
            onClick={() => {}}
          />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  );
};
