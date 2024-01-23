import {getRandomColor} from "src/utils/getRandomColor";
import styles from "src/logic/wayPage/jobTags/JobTag.module.scss";

/**
 * JobTag props
 */
interface JobTagProps {

  /**
   * Job tag
   */
  jobTag: string;

}

/**
 * Job tag component
 */
export const JobTag = (props: JobTagProps) => {
  const randomColor = getRandomColor();

  return (
    <div
      style={{color: randomColor, borderColor: randomColor}}
      className={styles.jobTag}
    >
      {props.jobTag}
    </div>
  );
};
