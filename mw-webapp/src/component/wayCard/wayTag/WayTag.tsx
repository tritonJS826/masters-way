import styles from "src/component/wayCard/wayTag/WayTag.module.scss";

/**
 * Way card tag props
 */
interface WayCardTagProps {

  /**
   * Way's tag name
   */
  tagName: string;
}

/**
 * WayCard tag component
 */
export const WayСardTag = (props: WayCardTagProps) => {
  return (
    <span className={styles.wayTag}>
      {props.tagName}
    </span>
  );
};

