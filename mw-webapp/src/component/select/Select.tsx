import * as SelectComponent from "@radix-ui/react-select";
import clsx from "clsx";
import {Icon, IconSize} from "src/component/icon/Icon";
import {SelectItem} from "src/component/select/selectItem/SelectItem";
import {Symbols} from "src/utils/Symbols";
import styles from "src/component/select/Select.module.scss";

/**
 * Option type for a select component
 */
export interface SelectItemType<T> {

  /**
   * Option`s id. Should be unique
   */
  id: string;

  /**
   * Option`s value
   */
  value: T;

  /**
   * Option`s visible text
   */
  text: string;

  /**
   * Data attributes for cypress testing
   */
  dataCy?: string;
}

/**
 * Get text from option's enum
 */
function getTextByValue<T>(options: SelectItemType<T>[], value: T) {
  const option = options.find(o => o.value === value);

  return option?.text ?? "";
}

/**
 * TriggerSelect params
 */
interface GetValueForTriggerSelectParams<T> {

  /**
   * TriggerSelect's options
   */
  options: SelectItemType<T>[];

  /**
   * TriggerSelect's value
   */
  value: T;

  /**
   * TriggerSelect's label
   */
  label?: string;

}

/**
 * Get Value for triggerSelect
 */
function getValueForTriggerSelect<T>(params: GetValueForTriggerSelectParams<T>) {
  const value = `${getTextByValue(params.options, params.value)}`;

  return value;
}

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyOverlay?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTrigger?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContentList: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyValue: string;
}

/**
 * Select props
 */
export interface SelectProps<T> {

  /**
   * Label's text
   */
  label?: string;

  /**
   * Select`s default value (does not depend on external state)
   */
  defaultValue?: T;

  /**
   * Select's value
   */
  value?: T;

  /**
   * Select's name
   */
  name: string;

  /**
   * Options list
   */
  options: SelectItemType<T>[];

  /**
   * Callback triggered onChange select value
   */
  onChange: (value: T) => void;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Text alternative to an element that has no visible text
   */
  ariaLabel?: string;
}

/**
 * Render list of options for select component
 */
const renderSelectOptions = <T extends string>(options: SelectItemType<T>[]) => options.map((option) => (
  <SelectItem
    key={option.id}
    value={option.value}
    data-cy={option.dataCy}
  >
    {option.text}
  </SelectItem>
));

/**
 * Represents a control that provides a menu of options
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
  return (
    <div
      className={clsx(styles.Select, props.className)}
      data-cy={props.cy?.dataCyOverlay}
      aria-label={props.ariaLabel}
    >
      <SelectComponent.Root
        onValueChange={props.onChange}
        value={props.value}
      >
        <SelectComponent.Trigger
          className={styles.SelectTrigger}
          data-cy={props.cy?.dataCyTrigger}
        >
          {props.label && (
            <span className={styles.SelectTriggerValue}>
              {props.label}
              {Symbols.NO_BREAK_SPACE}
            </span>
          ) }

          <SelectComponent.Value
            data-cy={props.cy?.dataCyValue}
            placeholder={getValueForTriggerSelect({
              label: props.label,
              value: props.defaultValue,
              options: props.options,
            })}
          />
          <Icon
            size={IconSize.MEDIUM}
            name="ChevronIcon"
            className={styles.SelectIcon}
          />
        </SelectComponent.Trigger>
        <SelectComponent.Portal>
          <SelectComponent.Content
            className={styles.SelectContent}
            position="popper"
            sideOffset={8}
            data-cy={props.cy?.dataCyContentList}
          >
            <SelectComponent.Viewport className={styles.SelectViewport}>
              <SelectComponent.Group className={styles.SelectItemsWrapper}>
                {renderSelectOptions(props.options)}
              </SelectComponent.Group>

            </SelectComponent.Viewport>
          </SelectComponent.Content>
        </SelectComponent.Portal>
      </SelectComponent.Root>
    </div>
  );
};
