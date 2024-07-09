import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDoneJobTagDAL} from "src/dataAccessLogic/JobDoneJobTagDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {Label} from "src/model/businessModel/Label";
import {User, UserPlain} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableJobsDoneCell/ReportsTableJobsDoneCell.module.scss";

/**
 * Reports table jobsDone cell props
 */
interface ReportsTableJobsDoneCellProps {

  /**
   * All jobDone tags in the way
   */
  jobTags: Label[];

  /**
   * Day report's uuid for update
   */
  dayReport: DayReport;

  /**
   * If true user can edit job done, if false - not
   */
  isEditable: boolean;

  /**
   * Logged in user
   */
  user: User | null;

  /**
   * Way's uuid
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;

  /**
   * If true - render link on original way in each job item
   */
  isWayComposite: boolean;

  /**
   * Way's participants
   */
  wayParticipantsMap: SafeMap<string, UserPlain>;

  /**
   * All labels
   */
  labels: Label[];

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
    const jobDone = await JobDoneDAL.createJobDone({
      dayReportUuid: props.dayReport.uuid,
      ownerUuid: userUuid,
      wayName: props.wayName,
      wayUuid: props.wayUuid,
    });
    props.dayReport.addJob(jobDone);
  };

  /**
   * Delete jobDone
   */
  const deleteJobDone = async (jobDoneUuid: string) => {
    props.dayReport.deleteJob(jobDoneUuid);
    await JobDoneDAL.deleteJobDone(jobDoneUuid);
  };

  /**
   * Update labels in job done
   */
  const updateLabelsInJobDone = async (params: {

    /**
     * Job done
     */
    jobDone: JobDone;

    /**
     * New updated list of tags
     */
    updatedTags: string[];
  }) => {

    const oldJob = props.dayReport.jobsDone.find(job => params.jobDone.uuid === job.uuid);
    if (!oldJob) {
      throw new Error(`No such job with ${params.jobDone.uuid} uuid`);
    }
    const oldLabels = oldJob.tags.map(label => label.uuid);
    const labelUuidsToAdd: string[] = params.updatedTags
      .filter(labelUuid => !oldLabels.includes(labelUuid));
    const labelUuidsToDelete: string[] = oldLabels
      .filter(
        labelUuid => !params.updatedTags.includes(labelUuid),
      );

    const addPromises = labelUuidsToAdd.map(labelUuid => JobDoneJobTagDAL.createJobDoneJobTag({
      jobDoneUuid: params.jobDone.uuid,
      jobTagUuid: labelUuid,
    }));
    const deletePromises = labelUuidsToDelete.map(labelUuid => JobDoneJobTagDAL.deleteJobDoneJobTag({
      jobDoneUuid: params.jobDone.uuid,
      jobTagUuid: labelUuid,
    }));

    await Promise.all([
      ...addPromises,
      ...deletePromises,
    ]);

    const newLabels = labelUuidsToAdd.map(labelUuidToAdd => {
      const newLabel = props.jobTags.find(tag => tag.uuid === labelUuidToAdd);
      if (!newLabel) {
        throw new Error(`Label with uuid ${labelUuidToAdd} is not defined`);
      }

      return newLabel;
    });

    const updatedTags = params.jobDone.tags
      .filter(oldLabel => !labelUuidsToDelete.includes(oldLabel.uuid))
      .concat(newLabels);

    params.jobDone.updateLabels(updatedTags);

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
              <Avatar
                alt={props.wayParticipantsMap.getValue(jobDone.ownerUuid).name}
                src={props.wayParticipantsMap.getValue(jobDone.ownerUuid).imageUrl}
              />
              <div className={styles.ownerName}>
                <Link path={pages.user.getPath({uuid: jobDone.ownerUuid})}>
                  {getFirstName(props.wayParticipantsMap.getValue(jobDone.ownerUuid).name)}
                </Link>
              </div>
              {props.isWayComposite &&
              <Link
                path={pages.way.getPath({uuid: jobDone.wayUuid})}
                className={styles.linkToOwnerWay}
              >
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content={LanguageService.way.reportsTable.columnTooltip.visitWay[language]
                    .replace("$wayName", `"${jobDone.wayName}"`)}
                >
                  <Icon
                    size={IconSize.MEDIUM}
                    name="WayIcon"
                    className={styles.socialMediaIcon}
                  />
                </Tooltip>
              </Link>
              }
              {props.isEditable ?
                <Modal
                  trigger={jobDone.tags.length === 0 ?
                    <div className={styles.tagsBlockTrigger}>
                      {LanguageService.way.reportsTable.column.addLabel[language]}
                    </div>
                    :
                    <div className={styles.tagsBlockTrigger}>
                      <JobDoneTags
                        jobDoneTags={jobDone.tags}
                        labels={props.labels}
                      />
                    </div>
                  }
                  content={
                    <ModalContentJobTags
                      jobTags={props.jobTags}
                      jobDoneTags={jobDone.tags}
                      isEditable={props.isEditable}
                      updateTags={(tagsToUpdate: string[]) => updateLabelsInJobDone({
                        jobDone,
                        updatedTags: tagsToUpdate,
                      })}
                    />
                  }
                />
                :
                <JobDoneTags
                  jobDoneTags={jobDone.tags}
                  labels={props.labels}
                />
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
                  onChangeFinish={async (time) => {
                    const jobDoneToUpdate = {
                      uuid: jobDone.uuid,
                      time: getValidatedTime(Number(time)),
                    };
                    await JobDoneDAL.updateJobDone({
                      jobDone: jobDoneToUpdate,
                      wayName: props.wayName,
                      wayUuid: props.wayUuid,
                    });
                    jobDone.updateTime(getValidatedTime(Number(time)));
                  }}
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
              onChangeFinish={async (description) => {
                const jobDoneToUpdate = {
                  uuid: jobDone.uuid,
                  description,
                };
                await JobDoneDAL.updateJobDone({
                  jobDone: jobDoneToUpdate,
                  wayName: props.wayName,
                  wayUuid: props.wayUuid,
                });
                jobDone.updateDescription(description);
              }}
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
