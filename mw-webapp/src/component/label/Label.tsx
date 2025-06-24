import clsx from "clsx";
import {EditableText} from "src/component/editableText/EditableText";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Label as LabelModel} from "src/model/businessModel/Label";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
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

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];
}

/**
 * Label component
 */
export const Label = (props: LabelProps) => {
  return (
    <Tooltip content={props.label.name}>
      <div
        style={{color: props.label.color, borderColor: !props.isEditable ? props.label.color : "none"}}
        className={clsx(styles.label, props.isSmall && styles.small, props.className)}
      >
        <EditableText
          value={props.label.name}
          onChangeFinish={(name) => props.onChangeValue && props.onChangeValue(name)}
          isEditable={props.isEditable}
          placeholder=""
          className={styles.editableText}
          validators={props.validators}
        />
      </div>
    </Tooltip>
  );
};
