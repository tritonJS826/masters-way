import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Tooltip} from "src/component/tooltip/Tooltip";
import styles from "src/component/tag/Tag.module.scss";

/**
 * Tag type enum
 */
export enum TagType {

  /**
   * Tag that used on way card
   */
  CARD_TAG = "cardTag",

  /**
   * Tag that used on User page and Way page
   */
  PRIMARY_TAG = "primaryTag",
}

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Cross button to remove tag
   */
  dataCyCross: string;

  /**
   * Tag itself
   */
  dataCyTag: string;
}

/**
 * Way card tag props
 */
interface TagProps {

  /**
   * Way's tag name
   */
  tagName: string;

  /**
   * Data attribute for cypress testing
   */
  cy?: Cy;

  /**
   * Tag type
   */
  type: TagType;

  /**
   * If true - tag could be removed by clicking on cross
   */
  isDeletable?: boolean;

  /**
   * Callback triggered on remove button
   */
  onDelete?: (name: string) => void;

  /**
   * Text for tooltip on remove button
   */
  removeTooltipText?: string;
}

/**
 * Tag component
 */
export const Tag = (props: TagProps) => {
  const isPrimaryTag = props.type === TagType.PRIMARY_TAG;
  const tagStyle = isPrimaryTag ? styles.primaryTag : styles.cardTag;

  const removeButton = (
    <Tooltip content={props.removeTooltipText}>
      <Button
        className={styles.removeButton}
        onClick={() => props.onDelete && props.onDelete(props.tagName)}
        dataCy={props.cy?.dataCyCross}
        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
        value={
          <Icon
            size={IconSize.SMALL}
            name="RemoveIcon"
            className={styles.removeIcon}
          />}
      />
    </Tooltip>);

  return (
    <div
      className={clsx(styles.tag, tagStyle)}
      data-cy={props.cy?.dataCyTag}
      role="note"
    >
      <Tooltip content={props.tagName}>
        <span className={styles.text}>
          {props.tagName}
        </span>
      </Tooltip>

      {props.isDeletable && removeButton}
    </div>
  );
};
