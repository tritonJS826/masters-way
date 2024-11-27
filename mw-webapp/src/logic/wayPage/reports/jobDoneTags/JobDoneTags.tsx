import {Label} from "src/component/label/Label";
import {Label as LabelModel} from "src/model/businessModel/Label";
import styles from "src/logic/wayPage/reports/jobDoneTags/JobDoneTags.module.scss";

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done labels in the item
   */
  jobDoneTags: LabelModel[];

  /**
   * All labels in the way
   */
  labels: LabelModel[];

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
          <Label
            key={jobDoneTag.uuid}
            label={jobDoneTag}
            isSmall
            className={styles.label}
          />
        );
      })
      }
    </div>
  );
};
