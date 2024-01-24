import clsx from "clsx";
import {getColorByString} from "src/utils/getColorByString";
import styles from "src/logic/wayPage/jobTags/JobTag.module.scss";

/**
 * JobTag props
 */
interface JobTagProps {

  /**
   * Job tag
   */
  jobTag: string;

  /**
   * Is small
   */
  isSmall?: boolean;

  /**
   * Is short
   */
  isShort?: boolean;

}

/**
 * Job tag component
 */
export const JobTag = (props: JobTagProps) => {
  const randomColor = getColorByString(props.jobTag);

  return (
    <div
      style={{color: randomColor, borderColor: randomColor}}
      className={clsx(styles.jobTag, props.isSmall && styles.small, props.isShort && styles.short)}
    >
      {props.jobTag}
    </div>
  );
};
