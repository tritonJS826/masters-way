import {TrashIcon} from "@radix-ui/react-icons";
import {Confirm} from "src/component/confirm/Confirm";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTag} from "src/logic/wayPage/jobTags/JobTag";
import styles from "src/logic/wayPage/reportsTable/JobDoneTags.module.scss";

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

  /**
   * Callback to update job done tags
   */
  updateTags: (newTags: string[]) => Promise<void>;
}

/**
 * Job done tags
 */
export const JobDoneTags = (props: JobDoneTagsProps) => {

  /**
   * Remove job tag from Job done
   */
  const removeJobTagFromJobDone = async (jobTagToRemove: string) => {
    const updatedJobTags = props.jobDoneTags.filter((jobTag) => jobTag !== jobTagToRemove);

    return props.updateTags(updatedJobTags);
  };

  return (
    <div>
      {props.jobDoneTags.map((jobDoneTag) => {
        return (
          <div
            key={jobDoneTag}
            className={styles.jobTags}
          >
            <JobTag jobTag={jobDoneTag} />
            {props.isEditable && (
              <Tooltip
                content="Delete job done tag"
                position={PositionTooltip.RIGHT}
              >
                <Confirm
                  trigger={
                    <TrashIcon className={styles.icon} />}
                  content={<p>
                    {`Are you sure you want to remove "${jobDoneTag}" tag"?`}
                  </p>}
                  onOk={() => removeJobTagFromJobDone(jobDoneTag)}
                  okText="Delete"
                />
              </Tooltip>
            )}
          </div>
        );
      })}
    </div>
  );
};
