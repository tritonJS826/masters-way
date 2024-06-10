import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Checkbox} from "src/component/checkbox/Checkbox";
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
import {CreateDayReportParams} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanDAL} from "src/dataAccessLogic/PlanDAL";
import {PlanJobTagDAL} from "src/dataAccessLogic/PlanJobTagDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {CopyPlanToJobDoneModalContent} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/\
copyPlanToJobDoneModalContent/CopyPlanToJobDoneModalContent";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Label} from "src/model/businessModel/Label";
import {Plan} from "src/model/businessModel/Plan";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {UserPreviewShort} from "src/model/businessModelPreview/UserPreviewShort";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/ReportsTablePlansCell.module.scss";

/**
 * Reports table plans cell props
 */
interface ReportsTablePlansCellProps {

  /**
   * All jobDone tags in the way
   */
  jobTags: Label[];

  /**
   * Day report's uuid for update
   */
  dayReport: DayReport;

  /**
   * Way
   */
  way: Way;

  /**
   * If true user can edit job done, if false - not
   */
  isEditable: boolean;

  /**
   * Logged in user
   */
  user: User | null;

  /**
   * Create new day report
   */
  createDayReport: (dayReportParams: CreateDayReportParams, dayReportUuids: DayReport[]) => Promise<DayReport>;

  /**
   * Way's participants
   */
  wayParticipantsMap: SafeMap<string, UserPreviewShort>;

}

/**
 * Cell with plans in reports table
 */
export const ReportsTablePlansCell = observer((props: ReportsTablePlansCellProps) => {
  const {language} = languageStore;

  /**
   * Create Plan
   */
  const createPlan = async (userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }
    const plan = await PlanDAL.createPlan({
      dayReportUuid: props.dayReport.uuid,
      ownerUuid: userUuid,
      wayName: props.way.name,
      wayUuid: props.way.uuid,
    });
    props.dayReport.addPlan(plan);
  };

  /**
   * Delete plan
   */
  const deletePlan = async (planUuid: string) => {
    props.dayReport.deletePlan(planUuid);
    await PlanDAL.deletePlan(planUuid);
  };

  /**
   * Copy plan to job done on current date
   * TODO: add check date
   */
  const copyToJobDone = async (plan: Plan, report: DayReport, ownerUuid?: string) => {
    if (!ownerUuid) {
      throw new Error("User is not exist and create plan is impossible");
    }
    const jobDone = await JobDoneDAL.createJobDone({
      dayReportUuid: props.dayReport.uuid,
      ownerUuid,
      wayName: props.way.name,
      wayUuid: props.way.uuid,
      plan,
    });
    props.dayReport.addJob(jobDone);
  };

  /**
   * Update labels in plan
   */
  const updateLabelsInPlan = async (params: {

    /**
     * Plan
     */
    plan: Plan;

    /**
     * New updated list of tags
     */
    updatedTags: string[];
  }) => {

    const oldPlan = props.dayReport.plans.find(plan => params.plan.uuid === plan.uuid);
    if (!oldPlan) {
      throw new Error(`No such plan with ${params.plan.uuid} uuid`);
    }
    const oldLabels = oldPlan.tags.map(label => label.uuid);
    const labelUuidsToAdd: string[] = params.updatedTags
      .filter(labelUuid => !oldLabels.includes(labelUuid));
    const labelUuidsToDelete: string[] = oldLabels
      .filter(
        labelUuid => !params.updatedTags.includes(labelUuid),
      );

    const addPromises = labelUuidsToAdd.map(labelUuid => PlanJobTagDAL.createPlanJobTag({
      planUuid: params.plan.uuid,
      jobTagUuid: labelUuid,
    }));
    const deletePromises = labelUuidsToDelete.map(labelUuid => PlanJobTagDAL.deletePlanJobTag({
      planUuid: params.plan.uuid,
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

    const updatedTags = params.plan.tags
      .filter(oldLabel => !labelUuidsToDelete.includes(oldLabel.uuid))
      .concat(newLabels);

    params.plan.updateLabels(updatedTags);

  };

  /**
   * Toggle plan done
   */
  const copyPlanToJobInCurrentDayReport = async (plan: Plan, ownerUuid: string) => {
    const currentDate = DateUtils.getShortISODateValue(new Date);
    const isCurrentDayReportExist =
                DateUtils.getShortISODateValue(props.way.dayReports[0].createdAt) === currentDate;

    const currentDayReport = !isCurrentDayReportExist
      ? await props.createDayReport({
        wayName: props.way.name,
        wayUuid: props.way.uuid,
      }, props.way.dayReports)
      : props.way.dayReports[0];

    await copyToJobDone(plan, currentDayReport, ownerUuid);
  };

  return (
    <VerticalContainer className={styles.list}>
      <ol className={styles.numberedList}>
        {props.dayReport.plans.map((plan, index) => (
          <li
            key={plan.uuid}
            className={styles.numberedListItem}
          >
            <HorizontalContainer className={styles.recordInfo}>
              {getListNumberByIndex(index)}
              <Avatar
                alt={props.wayParticipantsMap.getValue(plan.ownerUuid).name}
                src={props.wayParticipantsMap.getValue(plan.ownerUuid).imageUrl}
              />
              <Link
                path={pages.user.getPath({uuid: plan.ownerUuid})}
                className={styles.ownerName}
              >
                {getFirstName(props.wayParticipantsMap.getValue(plan.ownerUuid).name)}
              </Link>
              {props.way.children.length !== 0 &&
              <Link
                path={pages.way.getPath({uuid: plan.wayUuid})}
                className={styles.linkToOwnerWay}
              >
                <Tooltip
                  position={PositionTooltip.BOTTOM_LEFT}
                  content={LanguageService.way.reportsTable.columnTooltip.visitWay[language]
                    .replace("$wayName", `"${plan.wayName}"`)}
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
                  trigger={plan.tags.length === 0 ?
                    <div className={styles.tagsBlockTrigger}>
                      {LanguageService.way.reportsTable.column.addLabel[language]}
                    </div>
                    :
                    <div className={styles.tagsBlockTrigger}>
                      <JobDoneTags
                        jobDoneTags={plan.tags}
                        labels={props.way.jobTags}
                      />
                    </div>
                  }
                  content={
                    <ModalContentJobTags
                      jobTags={props.jobTags}
                      jobDoneTags={plan.tags}
                      isEditable={props.isEditable}
                      updateTags={(tagsToUpdate: string[]) => updateLabelsInPlan({
                        plan,
                        updatedTags: tagsToUpdate,
                      })}
                    />
                  }
                />
                :
                <JobDoneTags
                  jobDoneTags={plan.tags}
                  labels={props.way.jobTags}
                />
              }
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={LanguageService.way.reportsTable.columnTooltip.planTime[language]}
              >
                <EditableText
                  value={plan.time}
                  type="number"
                  max={MAX_TIME}
                  min={MIN_TIME}
                  onChangeFinish={async (time) => {
                    const planToUpdate = {
                      uuid: plan.uuid,
                      time: getValidatedTime(Number(time)),
                    };
                    await PlanDAL.updatePlan({
                      plan: planToUpdate,
                      wayName: props.way.name,
                      wayUuid: props.way.uuid,
                    });
                    plan.updateTime(getValidatedTime(Number(time)));
                  }}
                  className={styles.editableTime}
                  isEditable={plan.ownerUuid === props.user?.uuid}
                  placeholder={LanguageService.common.emptyMarkdownAction[language]}
                />
              </Tooltip>
              {props.isEditable &&
                <Tooltip
                  content={
                    plan.isDone
                      ? LanguageService.way.reportsTable.columnTooltip.planCheckboxUncompleted[language]
                      : LanguageService.way.reportsTable.columnTooltip.planCheckbox[language]
                  }
                  position={PositionTooltip.RIGHT}
                >
                  <Modal
                    trigger={
                      <Checkbox
                        isDefaultChecked={plan.isDone}
                        onChange={() => {}}
                        className={styles.checkbox}
                      />
                    }
                    content={
                      <CopyPlanToJobDoneModalContent
                        // TODO: get rid of work around
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        copyPlanToJobInCurrentDayReport={() => copyPlanToJobInCurrentDayReport(plan, props.user!.uuid)}
                        plan={plan}
                        updatePlan={async (planToUpdate) => {
                          plan.updateIsDone(planToUpdate.isDone);
                          await PlanDAL.updatePlan({
                            plan: planToUpdate,
                            wayName: props.way.name,
                            wayUuid: props.way.uuid,
                          });
                        }}
                      />
                    }
                  />

                </Tooltip>
              }
              {plan.ownerUuid === props.user?.uuid &&
              <Trash
                tooltipContent={LanguageService.way.reportsTable.columnTooltip.deletePlan[language]}
                tooltipPosition={PositionTooltip.BOTTOM}
                okText={LanguageService.modals.confirmModal.deleteButton[language]}
                cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                onOk={() => deletePlan(plan.uuid)}
                confirmContent={`${LanguageService.way.reportsTable.modalWindow.deletePlanQuestion[language]} 
                  "${plan.description}"?`}
              />
              }
            </HorizontalContainer>
            <EditableTextarea
              text={plan.description}
              onChangeFinish={async (description) => {
                const planToUpdate = {
                  uuid: plan.uuid,
                  description,
                };
                plan.updateDescription(description);
                await PlanDAL.updatePlan({
                  plan: planToUpdate,
                  wayName: props.way.name,
                  wayUuid: props.way.uuid,
                });
              }}
              isEditable={plan.ownerUuid === props.user?.uuid}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]}
            />
          </li>
        ))}
      </ol>
      <SummarySection
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addPlan[language]}
        tooltipPosition={PositionTooltip.RIGHT}
        onClick={() => createPlan(props.user?.uuid)}
        total={`${LanguageService.way.reportsTable.total[language]}${Symbols.NO_BREAK_SPACE}
          ${props.dayReport.plans.reduce((summaryTime, plan) => plan.time + summaryTime, DEFAULT_SUMMARY_TIME)}`
        }
      />
    </VerticalContainer>
  );
});
