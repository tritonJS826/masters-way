import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
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
}

/**
 * WayCard tag component
 */
export const Tag = (props: TagProps) => {
  const isPrimaryTag = props.type === TagType.PRIMARY_TAG;
  const tagStyle = isPrimaryTag ? styles.tag : styles.cardTag;
  const tag = (
    <span
      className={tagStyle}
      data-cy={props.cy?.dataCyTag}
    >
      {props.tagName}
    </span>);

  return isPrimaryTag ?
    (
      <div className={styles.tagContainer}>
        <Button
          className={clsx(styles.cross, !props.isDeletable && styles.hiddenCross)}
          onClick={() => {
            props.isDeletable && props?.onDelete && props.onDelete(props.tagName);
          }}
          dataCy={props.cy?.dataCyCross}
          value={"X"}
          buttonType={ButtonType.ICON_BUTTON}
        />
        {tag}
      </div>
    )
    : tag;
};
