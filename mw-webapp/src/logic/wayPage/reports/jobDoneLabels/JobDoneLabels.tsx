import {Label} from "src/component/label/Label";
import {Label as LabelModel} from "src/model/businessModel/Label";
import styles from "src/logic/wayPage/reports/jobDoneLabels/JobDoneLabels.module.scss";

/**
 * JobDoneLabelsProps
 */
interface JobDoneLabelsProps {

  /**
   * Job done labels in the item
   */
  jobDoneLabels: LabelModel[];

  /**
   * All labels in the way
   */
  labels: LabelModel[];

}

/**
 * Job done labels
 */
export const JobDoneLabels = (props: JobDoneLabelsProps) => {
  const jobDoneLabelUuids = props.jobDoneLabels.map(item => item.uuid);

  return (
    <div className={styles.labels}>
      {props.labels.map((jobDoneLabel) => {
        return (
          jobDoneLabelUuids.includes(jobDoneLabel.uuid) &&
          <Label
            key={jobDoneLabel.uuid}
            label={jobDoneLabel}
            isSmall
            className={styles.label}
          />
        );
      })
      }
    </div>
  );
};
