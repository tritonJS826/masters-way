import clsx from "clsx";
import {EditableText} from "src/component/editableText/EditableText";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Label as LabelModel} from "src/model/businessModel/Label";
import styles from "src/component/label/Label.module.scss";

const MAX_LENGTH_LABEL = 30;
const MIN_LENGTH_LABEL = 1;

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

  /**
   * Notification text for minimum length label
   */
  notificationMinLengthText?: string;

  /**
   * Notification text for maximum length label
   */
  notificationMaxLengthText?: string;
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
        <EditableText
          value={props.label.name}
          onChangeFinish={(name) => props.onChangeValue && props.onChangeValue(name)}
          isEditable={props.isEditable}
          placeholder=""
          className={styles.editableText}
          minLength={MIN_LENGTH_LABEL}
          maxLength={MAX_LENGTH_LABEL}
          notificationMinLengthText={props.notificationMinLengthText}
          notificationMaxLengthText={props.notificationMaxLengthText}
        />
      </div>
    </Tooltip>
  );
};
