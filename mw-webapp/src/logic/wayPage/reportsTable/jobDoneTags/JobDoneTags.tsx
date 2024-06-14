import {LabelItem} from "src/logic/wayPage/labels/label/Label";
import {Label} from "src/model/businessModel/Label";
import styles from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags.module.scss";

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: Label[];

  /**
   * All labels in the way
   */
  labels: Label[];

}

/**
 * Job done tags
 */
export const JobDoneTags = (props: JobDoneTagsProps) => {
  const jobDoneTagUuids = props.jobDoneTags.map(item => item.uuid);

  return (
    <div className={styles.jobTags}>
      {props.labels.map((jobDoneTag) => {
        return (
          jobDoneTagUuids.includes(jobDoneTag.uuid) &&
          <LabelItem
            key={jobDoneTag.uuid}
            label={jobDoneTag}
            isSmall
          />
        );
      })
      }
    </div>
  );
};
