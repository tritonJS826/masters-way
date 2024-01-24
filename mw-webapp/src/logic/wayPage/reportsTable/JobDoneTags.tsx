import {JobTag} from "src/logic/wayPage/jobTags/JobTag";
import styles from "src/logic/wayPage/reportsTable/JobDoneTags.module.scss";

const DEFAULT_AMOUNT_TAGS = 1;

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: string[];

  /**
   * Is editable
   */
  isEditable: boolean;
}

/**
 * Job done tags
 */
export const JobDoneTags = (props: JobDoneTagsProps) => {
  const jobDoneTags = props.jobDoneTags.length === DEFAULT_AMOUNT_TAGS
    ? props.jobDoneTags
    : props.jobDoneTags.slice(DEFAULT_AMOUNT_TAGS);

  return (
    <div className={styles.jobTags}>
      {jobDoneTags.map((jobDoneTag) => {
        return (
          <JobTag
            key={jobDoneTag}
            jobTag={jobDoneTag}
            isSmall
            isShort
          />
        );
      })
      }
    </div>
  );
};
