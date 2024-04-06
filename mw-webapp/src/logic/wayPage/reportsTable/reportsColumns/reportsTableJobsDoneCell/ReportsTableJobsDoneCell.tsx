import {TrashIcon} from "@radix-ui/react-icons";
import {clsx} from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableValue} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDoneJobTagDAL} from "src/dataAccessLogic/JobDoneJobTagDAL";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {User} from "src/model/businessModel/User";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableJobsDoneCell/ReportsTableJobsDoneCell.module.scss";

/**
 * Reports table jobsDone cell props
 */
interface ReportsTableJobsDoneCellProps {

  /**
   * All jobDone tags in the way
   */
  jobTags: JobTag[];

  /**
   * Day report's uuid for update
   */
  dayReport: DayReport;

  /**
   * If true user can edit job done, if false - not
   */
  isEditable: boolean;

  /**
   * Callback for update dayReport
   */
  updateDayReport: (report: PartialWithUuid<DayReport>) => Promise<void>;

  /**
   * Logged in user
   */
  user: User | null;

}

/**
 * Cell with jobs done in reports table
 */
export const ReportsTableJobsDoneCell = (props: ReportsTableJobsDoneCellProps) => {

  /**
   * Create jobDone
   */
  const createJobDone = async (userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }
    const jobDone = await JobDoneDAL.createJobDone(userUuid, props.dayReport.uuid);
    const jobsDone = [...props.dayReport.jobsDone, jobDone];

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone});
  };

  /**
   * Delete jobDone
   */
  const deleteJobDone = async (jobDoneUuid: string) => {
    const jobsDone = props.dayReport.jobsDone.filter((jobDone) => jobDone.uuid !== jobDoneUuid);

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone});
    await JobDoneDAL.deleteJobDone(jobDoneUuid);
  };

  /**
   * Update labels in job done
   */
  const updateLabelsInJobDone = async (params: {

    /**
     * Job done uuid
     */
    jobDoneUuid: string;

    /**
     * New updated list of tags
     */
    updatedTags: JobTag[];
  }) => {

    const oldJob = props.dayReport.jobsDone.find(job => params.jobDoneUuid === job.uuid);
    if (!oldJob) {
      throw new Error(`No such job with ${params.jobDoneUuid} uuid`);
    }
    const oldLabels = oldJob.tags.map(label => label.uuid);
    const labelUuidsToAdd: string[] = params.updatedTags
      .map(label => label.uuid)
      .filter(labelUuid => !oldLabels.includes(labelUuid));
    const labelUuidsToDelete: string[] = oldLabels
      .filter(
        labelUuid => !params.updatedTags.map(label => label.uuid).includes(labelUuid),
      );

    const addPromises = labelUuidsToAdd.map(labelUuid => JobDoneJobTagDAL.createJobDoneJobTag({
      jobDoneUuid: params.jobDoneUuid,
      jobTagUuid: labelUuid,
    }));
    const deletePromises = labelUuidsToDelete.map(labelUuid => JobDoneJobTagDAL.deleteJobDoneJobTag({
      jobDoneUuid: params.jobDoneUuid,
      jobTagUuid: labelUuid,
    }));

    Promise.all([
      ...addPromises,
      ...deletePromises,
    ]);

    const updatedJobs = props.dayReport.jobsDone.map((job) => {
      const isUpdatedJob = job.uuid === params.jobDoneUuid;
      if (isUpdatedJob) {
        const newLabels = labelUuidsToAdd.map(labelUuidToAdd => {
          const newLabel = props.jobTags.find(tag => tag.uuid === labelUuidToAdd);
          if (!newLabel) {
            throw new Error(`Label with uuid ${labelUuidToAdd} is not defined`);
          }

          return newLabel;
        });
        const updatedTags = job.tags
          .filter(oldLabel => !labelUuidsToDelete.includes(oldLabel.uuid))
          .concat(newLabels);

        const updatedJobDone = new JobDone({
          ...oldJob,
          tags: updatedTags,
        });

        return updatedJobDone;
      } else {
        return job;
      }
    });

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone: updatedJobs});

  };

  /**
   * Update jobDone
   */
  const updateJobDone = async (jobDoneToUpdate: PartialWithUuid<JobDone>) => {
    const updatedJobDone = await JobDoneDAL.updateJobDone(jobDoneToUpdate); //!HERE
    const updatedJobsDone = props.dayReport.jobsDone.map((item) => {
      const itemToReturn = item.uuid === jobDoneToUpdate.uuid
        ? updatedJobDone
        : item;

      return itemToReturn;
    });

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone: updatedJobsDone});
  };

  return (
    <VerticalContainer className={styles.list}>
      <ol className={styles.numberedList}>
        {props.dayReport.jobsDone.map((jobDone, index) => (
          <li
            key={jobDone.uuid}
            className={styles.numberedListItem}
          >
            <HorizontalContainer className={clsx(styles.horizontalContainer, styles.listNumberAndName)}>
              {getListNumberByIndex(index)}
              <HorizontalContainer className={styles.icons}>
                {props.isEditable ?
                  <Modal
                    trigger={jobDone.tags.length === 0 ?
                      <div className={styles.tagsBlockTrigger}>
                        Add tag
                      </div>
                      :
                      <div className={styles.tagsBlockTrigger}>
                        <JobDoneTags jobDoneTags={jobDone.tags} />
                      </div>
                    }
                    content={
                      <ModalContentJobTags
                        jobTags={props.jobTags}
                        jobDoneTags={jobDone.tags}
                        isEditable={props.isEditable}
                        updateTags={(tagsToUpdate: JobTag[]) => updateLabelsInJobDone({
                          jobDoneUuid: jobDone.uuid,
                          updatedTags: tagsToUpdate,
                        })}
                      />
                    }
                  />
                  : <JobDoneTags jobDoneTags={jobDone.tags} />
                }
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content={`Time${Symbols.NO_BREAK_SPACE}spent on job`}
                >
                  <EditableValue
                    value={jobDone.time}
                    type="number"
                    max={MAX_TIME}
                    min={MIN_TIME}
                    onChangeFinish={(time) =>
                      updateJobDone({
                        uuid: jobDone.uuid,
                        time: getValidatedTime(Number(time)),
                      })}
                    className={styles.editableTime}
                    isEditable={props.isEditable}
                  />
                </Tooltip>
                {props.isEditable &&
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content="Delete jobDone"
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`Are you sure you want to delete the jobDone "${jobDone.description}"?`}
                    </p>}
                    onOk={() => deleteJobDone(jobDone.uuid)}
                    okText="Delete"
                  />
                </Tooltip>
                }
              </HorizontalContainer>
            </HorizontalContainer>
            <EditableTextarea
              text={jobDone.description}
              onChangeFinish={(description) => updateJobDone({
                uuid: jobDone.uuid,
                description,
              })}
              isEditable={props.isEditable}
              className={styles.editableTextarea}
            />
          </li>
        ))}
      </ol>
      <div className={styles.summarySection}>
        {props.isEditable &&
        <Tooltip
          content="Add job"
          position={PositionTooltip.RIGHT}
        >
          <Button
            value={
              <Icon
                size={IconSize.SMALL}
                name="PlusIcon"
              />
            }
            onClick={() => createJobDone(props.user?.uuid)}
            buttonType={ButtonType.ICON_BUTTON}
          />
        </Tooltip>
        }
        <div className={styles.summaryText}>
          {"Total: "}
          {props.dayReport.jobsDone
            .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
          }
        </div>
      </div>
    </VerticalContainer>
  );
};
