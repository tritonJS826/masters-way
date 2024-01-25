import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import {Trigger as DialogTrigger} from "@radix-ui/react-dialog";

/**
 * This component is used to wrap elements that act as triggers to open a modal when clicked.
 */
export const ModalTrigger = forwardRef((props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
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

ModalTrigger.displayName = "ModalTrigger";
