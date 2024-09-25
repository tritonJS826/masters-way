import {useState} from "react";
import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {Separator} from "src/component/separator/Separator";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanDAL} from "src/dataAccessLogic/PlanDAL";
import {PlanJobTagDAL} from "src/dataAccessLogic/PlanJobTagDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {AccessErrorStore} from "src/logic/wayPage/reportsTable/dayReportsTable/AccesErrorStore";
import {DecomposeIssueAiModal} from "src/logic/wayPage/reportsTable/decomposeIssueAiModal/DecomposeIssueAiModal";
import {EstimateIssueAiModal} from "src/logic/wayPage/reportsTable/estimateIssueAiModal/EstimateIssueAiModal";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentLabels} from "src/logic/wayPage/reportsTable/modalContentLabels/ModalContentLabels";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {CopyPlanToJobDoneModalContent} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/\
copyPlanToJobDoneModalContent/CopyPlanToJobDoneModalContent";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportCompositionParticipant} from "src/model/businessModel/DayReportCompositionParticipants";
import {Label} from "src/model/businessModel/Label";
import {Plan} from "src/model/businessModel/Plan";
import {User, UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayWithoutDayReports} from "src/model/businessModelPreview/WayWithoutDayReports";
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
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;

  /**
   * Way's participants
   */
  wayParticipantsMap: SafeMap<string, UserPlain>;

  /**
   * Sdf
   */
  waysMap: SafeMap<string, WayWithoutDayReports>;

}

/**
 * Cell with plans in reports table
 */
export const ReportsTablePlansCell = observer((props: ReportsTablePlansCellProps) => {
  const {language} = languageStore;

  const [accessErrorStore] = useState<AccessErrorStore>(new AccessErrorStore());

  if (accessErrorStore.dayReportParticipant) {
    return (
      <Modal
        isOpen={true}
        trigger={<></>}
        content={
          <>
            <p>
              {LanguageService.error.noAccessRight[language]}
            </p>
            <Link path={pages.way.getPath({uuid: accessErrorStore.dayReportParticipant?.wayId})}>
              {accessErrorStore.dayReportParticipant?.wayName}
            </Link>
          </>
        }
      />
    );
  }

  /**
   * Create Plan
   */
  const createPlan = async (compositionParticipant: DayReportCompositionParticipant, userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }
    try {
      const plan = await PlanDAL.createPlan({
        dayReportUuid: compositionParticipant.dayReportId,
        ownerUuid: userUuid,
      });
      props.dayReport.addPlan(plan);
    } catch (error) {
      accessErrorStore.setAccessErrorStore(compositionParticipant);
    }
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
      dayReportUuid: plan.dayReportUuid,
      ownerUuid,
      plan,
    });
    report.addJob(jobDone);
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
    updatedTags: Label[];
  }) => {

    const labelsToAdd: Label[] = params.updatedTags
      .filter(label => !params.plan.tags.includes(label));
    const labelsToDelete: Label[] = params.plan.tags
      .filter(label => !params.updatedTags.includes(label));

    const addPromises = labelsToAdd.map(label => PlanJobTagDAL.createPlanJobTag({
      planUuid: params.plan.uuid,
      jobTagUuid: label.uuid,
    }));
    const deletePromises = labelsToDelete.map(label => PlanJobTagDAL.deletePlanJobTag({
      planUuid: params.plan.uuid,
      jobTagUuid: label.uuid,
    }));

    await Promise.all([
      ...addPromises,
      ...deletePromises,
    ]);

    params.plan.updateLabels(params.updatedTags);

  };

  /**
   * Toggle plan done
   */
  const copyPlanToJobInCurrentDayReport = async (plan: Plan, ownerUuid: string) => {
    const currentDate = DateUtils.getShortISODateValue(new Date);
    const isCurrentDayReportExist =
                DateUtils.getShortISODateValue(props.way.dayReports[0].createdAt) === currentDate;

    const currentDayReport = !isCurrentDayReportExist
      ? await props.createDayReport(props.way.uuid, props.way.dayReports)
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
            <VerticalContainer className={styles.contentBlock}>
              <HorizontalContainer className={styles.recordInfo}>
                {getListNumberByIndex(index)}
                <Avatar
                  alt={props.wayParticipantsMap.getValue(plan.ownerUuid).name}
                  src={props.wayParticipantsMap.getValue(plan.ownerUuid).imageUrl}
                />
                <div className={styles.ownerName}>
                  <Link path={pages.user.getPath({uuid: plan.ownerUuid})}>
                    {getFirstName(props.wayParticipantsMap.getValue(plan.ownerUuid).name)}
                  </Link>
                </div>
                {props.way.children.length !== 0 &&
                <Link
                  path={pages.way.getPath({uuid: plan.wayUuid})}
                  className={styles.linkToOwnerWay}
                >
                  <Tooltip
                    position={PositionTooltip.TOP}
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
                {props.user &&
                  <>
                    <Modal
                      trigger={
                        <Tooltip
                          position={PositionTooltip.TOP}
                          content={LanguageService.way.reportsTable.decomposeIssueByAI[language]}
                        >
                          <Button
                            onClick={() => { }}
                            buttonType={ButtonType.ICON_BUTTON}
                            value="DE"
                            className={styles.aiButton}
                          />
                        </Tooltip>
                      }
                      content={
                        <DecomposeIssueAiModal
                          goalDescription={props.way.goalDescription}
                          issueDescription={plan.description}
                          dayReportUuid={plan.dayReportUuid}
                          ownerUuid={props.user.uuid}
                          addPlan={(generatedPlan: Plan) => props.dayReport.addPlan(generatedPlan)}
                        />}
                    />
                    <Modal
                      trigger={
                        <Tooltip
                          position={PositionTooltip.TOP}
                          content={LanguageService.way.reportsTable.estimateIssueByAI[language]}
                        >
                          <Button
                            onClick={() => { }}
                            buttonType={ButtonType.ICON_BUTTON}
                            value="ES"
                            className={styles.aiButton}
                          />
                        </Tooltip>
                      }
                      content={
                        <EstimateIssueAiModal
                          goalDescription={props.way.goalDescription}
                          issueDescription={plan.description}
                        />
                      }
                    />
                  </>
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
                      await PlanDAL.updatePlan({plan: planToUpdate});
                      plan.updateTime(getValidatedTime(Number(time)));
                    }}
                    className={styles.editableTime}
                    isEditable={plan.ownerUuid === props.user?.uuid}
                    placeholder={LanguageService.common.emptyMarkdownAction[language]}
                    cy={
                      {
                        trigger: dayReportsAccessIds.dayReportsContent.plans.estimatedPlanTime,
                        placeholder: "",
                        inputCy: dayReportsAccessIds.dayReportsContent.plans.estimatedPlanTimeInput,
                      }
                    }
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
                          isDisabled={true}
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
                            await PlanDAL.updatePlan({plan: planToUpdate});
                          }}
                        />
                      }
                    />

                  </Tooltip>
                }
                {plan.ownerUuid === props.user?.uuid ?
                  <Trash
                    tooltipContent={LanguageService.way.reportsTable.columnTooltip.deletePlan[language]}
                    tooltipPosition={PositionTooltip.BOTTOM}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                    onOk={() => deletePlan(plan.uuid)}
                    confirmContent={`${LanguageService.way.reportsTable.modalWindow.deletePlanQuestion[language]} 
                    "${plan.description}"?`}
                  />
                  : (
                    <div className={styles.trashReservation} />
                  )
                }
              </HorizontalContainer>
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
                    <ModalContentLabels
                      labels={props.waysMap.getValue(plan.wayUuid).jobTags}
                      labelsDone={plan.tags}
                      isEditable={props.isEditable}
                      updateLabels={(labelsToUpdate: Label[]) => updateLabelsInPlan({
                        plan,
                        updatedTags: labelsToUpdate,
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
            </VerticalContainer>
            <EditableTextarea
              text={plan.description}
              onChangeFinish={async (description) => {
                const planToUpdate = {
                  uuid: plan.uuid,
                  description,
                };
                plan.updateDescription(description);
                await PlanDAL.updatePlan({plan: planToUpdate});
              }}
              isEditable={plan.ownerUuid === props.user?.uuid}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]}
              cy={
                {
                  textArea: dayReportsAccessIds.dayReportsContent.plans.planDescriptionInput,
                  trigger: dayReportsAccessIds.dayReportsContent.plans.planDescription,
                }
              }
            />
            <Separator />
          </li>
        ))}
      </ol>
      <SummarySection
        wayId={props.way.uuid}
        compositionParticipants={props.dayReport.compositionParticipants}
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addPlan[language]}
        tooltipPosition={PositionTooltip.RIGHT}
        onClick={(compositionParticipant: DayReportCompositionParticipant) =>
          createPlan(compositionParticipant, props.user?.uuid)}
        total={`${LanguageService.way.reportsTable.total[language]}${Symbols.NO_BREAK_SPACE}
          ${props.dayReport.plans.reduce((summaryTime, plan) => plan.time + summaryTime, DEFAULT_SUMMARY_TIME)}`
        }
        goalDescription={props.way.goalDescription}
        addPlan={(generatedPlan: Plan) => props.dayReport.addPlan(generatedPlan)}
        metrics={props.way.metrics}
        ownerUuid={props.user?.uuid}
        generatePlanTooltip={LanguageService.way.reportsTable.generatePlansByAI[language]}
        isPlanColumn={true}
      />
    </VerticalContainer>
  );
});
