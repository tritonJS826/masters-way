import clsx from "clsx";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Label} from "src/model/businessModel/Label";
import styles from "src/component/label/Label.module.scss";

/**
 * Label props
 */
interface LabelProps {

  /**
   * Job tag
   */
  label: Label;

  /**
   * Is small
   * @default false
   */
  isSmall?: boolean;

  /**
   * Custom classname
   */
  className?: string;

  /**
   * Is label editable
   * @default false
   */
  isEditable?: boolean;

  /**
   * Callback triggered on change label
   */
  onChangeValue?: (value: string) => void;
}

/**
 * Job tag component
 */
export const LabelItem = (props: LabelProps) => {
  return (
    <Tooltip content={props.label.name}>
      <div
        style={{color: props.label.color, borderColor: props.label.color}}
        className={clsx(styles.label, props.isSmall && styles.small, props.className)}
      >
        {props.label.name}
      </div>
    </Tooltip>
  );
};
