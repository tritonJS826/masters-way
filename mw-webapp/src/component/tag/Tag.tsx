import clsx from "clsx";
import styles from "src/component/tag/Tag.module.scss";

/**
 * Tag type enum
 */
export enum TagType {

  /**
   * Tag that used on way card
   */
  WAY_CARD_TAG = "wayCardTag",

  /**
   * Tag that used on User page and Way page
   */
  BASIC_TAG = "basicTag",
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
  return props.type === TagType.BASIC_TAG ?
    (
      <button className={styles.tagContainer}>
        <span
          className={clsx(styles.cross, !props.isDeletable && styles.hiddenCross)}
          onClick={() => {
            props.isDeletable && props?.onDelete && props.onDelete(props.tagName);
          }}
          data-cy={props.cy?.dataCyCross}
        >
          X
        </span>

        <span
          className={styles.tag}
          data-cy={props.cy?.dataCyTag}
        >
          {props.tagName}
        </span>
      </button>
    )
    :
    (
      <span
        className={styles.wayTag}
        data-cy={props.cy?.dataCyTag}
      >
        {props.tagName}
      </span>
    );
};
