import clsx from "clsx";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Label as LabelModel} from "src/model/businessModel/Label";
import styles from "src/component/label/Label.module.scss";

/**
 * Label props
 */
interface LabelProps {

  /**
   * Job tag
   */
  label: LabelModel;

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
 * Label component
 */
export const Label = (props: LabelProps) => {
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
