import styles from "src/component/wayCard/wayTag/WayTag.module.scss";

/**
 * Way tag props
 */
interface WayTagProps {

  /**
   * Way's tag name
   */
  tagName: string;
}

/**
 * Way tag component
 */
export const WayTag = (props: WayTagProps) => {
  return (
    <span className={styles.wayTag}>
      {props.tagName}
    </span>
  );
};

