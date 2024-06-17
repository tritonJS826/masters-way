import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
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
export const Tag = observer((props: TagProps) => {
  const isPrimaryTag = props.type === TagType.PRIMARY_TAG;
  const tagStyle = isPrimaryTag ? styles.primaryTag : styles.cardTag;
  const isShowRemoveButton = isPrimaryTag && props.isDeletable;
  const {language} = languageStore;

  const removeButton = (
    <Tooltip content={LanguageService.common.removeTag[language]}>
      <button
        className={styles.removeButton}
        onClick={() => {
          props.isDeletable && props?.onDelete && props.onDelete(props.tagName);
        }}
        data-cy={props.cy?.dataCyCross}
      >
        <Icon
          size={IconSize.SMALL}
          name="RemoveIcon"
          className={styles.removeIcon}
        />
      </button>
    </Tooltip>);

  return (
    <div
      className={clsx(styles.tag, tagStyle)}
      data-cy={props.cy?.dataCyTag}
    >
      <Tooltip content={props.tagName}>
        <span className={styles.text}>
          {props.tagName}
        </span>
      </Tooltip>

      { isShowRemoveButton && removeButton }
    </div>
  );
});
