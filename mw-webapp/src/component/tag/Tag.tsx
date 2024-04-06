import styles from "src/component/tag/Tag.module.scss";

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
  dataCy?: string;
}

/**
 * WayCard tag component
 */
export const Tag = (props: TagProps) => {
  return (
    <span
      className={styles.tag}
      data-cy={props.dataCy}
    >
      {props.tagName}
    </span>
  );
};

