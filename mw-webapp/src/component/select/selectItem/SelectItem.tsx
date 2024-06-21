
import {ForwardedRef, forwardRef} from "react";
import * as SelectComponent from "@radix-ui/react-select";
import clsx from "clsx";
import styles from "src/component/select/Select.module.scss";

/**
 * Select item's props
 */
export interface SelectItemProps {

  /**
   * Option`s id. Should be unique
   */
  id?: string;

  /**
   * Select item's children
   */
  children: string;

  /**
   * Select item's className
   */
  className?: string;

  /**
   * Select item's value
   */
  value: string;

  /**
   * Select item is disabled or not
   * @default false
   */
  isDisabled?: boolean;
}
export const SelectItem = forwardRef((
  props: SelectItemProps,
  forwardedRef: ForwardedRef<HTMLDivElement>) => {

  return (
    <SelectComponent.Item
      className={clsx(styles.SelectItem, props.className)}
      {...props}
      ref={forwardedRef}
      disabled={props.isDisabled}

    >
      <SelectComponent.ItemText>
        {props.children}
      </SelectComponent.ItemText>
    </SelectComponent.Item>
  );
});

SelectItem.displayName = "SelectItem";
