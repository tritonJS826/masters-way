import {TrashIcon} from "@radix-ui/react-icons";
import {clsx} from "clsx";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableValue} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import {v4 as uuidv4} from "uuid";
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

}

/**
 * Cell with jobs done in reports table
 */
export const ReportsTableJobsDoneCell = (props: ReportsTableJobsDoneCellProps) => {
  const defaultTag = props.jobTags.find((jobTag) => jobTag.name === "no tag");
  if (!defaultTag) {
    throw new Error("Default tag is not exist");
  }

  /**
   * Create jobDone
   */
  const createJobDone = () => {
    const jobDone: JobDone = new JobDone({
      description: "",
      time: 0,
      uuid: uuidv4(),
      tags: [defaultTag],
    });
    const jobsDone = [...props.dayReport.jobsDone, jobDone];

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone});
  };

  /**
   * Delete jobDone
   */
  const deleteJobDone = (jobDoneUuid: string) => {
    const jobsDone = props.dayReport.jobsDone.filter((jobDone) => jobDone.uuid !== jobDoneUuid);

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone});
  };

  /**
   * Update jobDone
   */
  const updateJobDone = (jobDone: JobDone, text: string) => {
    const updatedJobsDone = props.dayReport.jobsDone.map((item) => {
      const itemToReturn = item.uuid === jobDone.uuid
        ? new JobDone({
          ...jobDone,
          description: text,
        })
        : item;

      return itemToReturn;
    });

    props.updateDayReport({uuid: props.dayReport.uuid, jobsDone: updatedJobsDone});
  };

  /**
   * Update jobDoneTime
   */
  const updateJobDoneTime = (jobDone: JobDone, time: number) => {
    const updatedJobsDone = props.dayReport.jobsDone.map((item) => {
      const itemToReturn = item.uuid === jobDone.uuid
        ? new JobDone({
          ...jobDone,
          time,
        })
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
                    trigger={
                      <div className={styles.tagsBlockTrigger}>
                        <JobDoneTags jobDoneTags={jobDone.tags} />
                      </div>
                    }
                    content={
                      <ModalContentJobTags
                        jobTags={props.jobTags}
                        jobDoneTags={jobDone.tags}
                        isEditable={props.isEditable}
                        updateTags={(tagsToUpdate: JobTag[]) => props.updateDayReport({
                          ...props.dayReport,
                          jobsDone: props.dayReport.jobsDone?.map(previousJobDone => previousJobDone.uuid === jobDone.uuid
                            ? {...previousJobDone, tags: tagsToUpdate}
                            : previousJobDone),
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
                    onChangeFinish={(time) =>
                      updateJobDoneTime(jobDone, getValidatedTime(Number(time)))}
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
              onChangeFinish={(text) => updateJobDone(jobDone, text)}
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
            onClick={createJobDone}
            className={styles.flatButton}
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
