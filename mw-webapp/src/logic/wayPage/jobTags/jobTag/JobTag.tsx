import clsx from "clsx";
import {JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/wayPage/jobTags/jobTag/JobTag.module.scss";

/**
 * JobTag props
 */
interface JobTagProps {

  /**
   * Job tag
   */
  jobTag: JobTagData;

  /**
   * Is small
   * @default false
   */
  isSmall?: boolean;

}

/**
 * Job tag component
 */
export const JobTag = (props: JobTagProps) => {
  return (
    <div
      style={{color: props.jobTag.color, borderColor: props.jobTag.color}}
      className={clsx(styles.jobTag, props.isSmall && styles.small)}
    >
      {props.jobTag.name}
    </div>
  );
};
