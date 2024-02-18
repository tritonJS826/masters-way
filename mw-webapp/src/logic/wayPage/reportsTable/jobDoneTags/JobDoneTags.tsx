import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags.module.scss";

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: JobTagData[];

}

/**
 * Job done tags
 */
export const JobDoneTags = (props: JobDoneTagsProps) => {
  return (
    <div className={styles.jobTags}>
      {props.jobDoneTags.map((jobDoneTag) => {
        return (
          <JobTag
            key={jobDoneTag.uuid}
            jobTag={jobDoneTag}
            isSmall
          />
        );
      })
      }
    </div>
  );
};
