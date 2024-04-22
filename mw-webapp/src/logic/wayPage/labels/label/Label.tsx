import clsx from "clsx";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/wayPage/labels/label/Label.module.scss";

/**
 * TODO: Move to components
 * Label props
 */
interface LabelProps {

  /**
   * Job tag
   */
  label: JobTag;

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
export const Label = (props: LabelProps) => {
  return (
    <div
      style={{color: props.label.color, borderColor: props.label.color}}
      className={clsx(styles.label, props.isSmall && styles.small, props.className)}
    >
      {props.label.name}
    </div>
  );
};
