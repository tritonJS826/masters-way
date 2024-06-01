import {observer} from "mobx-react-lite";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDoneJobTagDAL} from "src/dataAccessLogic/JobDoneJobTagDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {User} from "src/model/businessModel/User";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
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
  updateDayReport: (report: PartialWithUuid<DayReport>) => void;

  /**
   * Logged in user
   */
  user: User | null;

}

/**
 * Cell with jobs done in reports table
 */
export const ReportsTableJobsDoneCell = observer((props: ReportsTableJobsDoneCellProps) => {
  const {language} = languageStore;

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

    await Promise.all([
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
            <HorizontalContainer className={styles.recordInfo}>
              {getListNumberByIndex(index)}
              <Link
                path={pages.user.getPath({uuid: jobDone.ownerUuid})}
                className={styles.ownerName}
              >
                {getFirstName(jobDone.ownerName)}
              </Link>
              {props.isEditable ?
                <Modal
                  trigger={jobDone.tags.length === 0 ?
                    <div className={styles.tagsBlockTrigger}>
                      {LanguageService.way.reportsTable.column.addLabel[language]}
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
                content={LanguageService.way.reportsTable.columnTooltip.jobTime[language]}
              >
                <EditableText
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
                  placeholder={LanguageService.common.emptyMarkdownAction[language]}
                />
              </Tooltip>
              {props.isEditable &&
              <Trash
                tooltipContent={LanguageService.way.reportsTable.columnTooltip.deleteJob[language]}
                tooltipPosition={PositionTooltip.BOTTOM}
                okText={LanguageService.modals.confirmModal.deleteButton[language]}
                cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                onOk={() => deleteJobDone(jobDone.uuid)}
                confirmContent={`${LanguageService.way.reportsTable.modalWindow.deleteJobQuestion[language]}
                  "${jobDone.description}"?`}
              />
              }
            </HorizontalContainer>
            <EditableTextarea
              text={jobDone.description}
              onChangeFinish={(description) => updateJobDone({
                uuid: jobDone.uuid,
                description,
              })}
              isEditable={props.isEditable}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]}
            />
          </li>
        ))}
      </ol>
      <SummarySection
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addJob[language]}
        tooltipPosition={PositionTooltip.RIGHT}
        onClick={() => createJobDone(props.user?.uuid)}
        total={`${LanguageService.way.reportsTable.total[language]}${Symbols.NO_BREAK_SPACE}
          ${props.dayReport.jobsDone.reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)}`
        }
      />
    </VerticalContainer>
  );
});
