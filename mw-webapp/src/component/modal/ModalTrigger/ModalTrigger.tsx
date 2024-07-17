import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";
import clsx from "clsx";
import styles from "src/component/modal/ModalTrigger/ModalTrigger.module.scss";

/**
 * ModalTrigger props
 */
interface ModalTriggerProps {

  /**
   * Data attribute for cypress testing
   */
  dataCyTrigger?: string;

  /**
   * If true then trigger has width with value fit-content
   * @default true
   */
  isFitContent?: boolean;

}

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 */
export const ModalTrigger = forwardRef((props: PropsWithChildren<ModalTriggerProps>, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <DialogTrigger
      data-cy={props.dataCyTrigger}
      asChild
    >
      <div
        ref={ref}
        role="button"
        data-cy={props.dataCyTrigger}
        className={clsx(props.isFitContent && styles.wrapperTrigger)}
      >
        {props.children}
      </div>
    </DialogTrigger>
  );
});

ModalTrigger.displayName = "ModalTrigger";
