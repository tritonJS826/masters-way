import {TrashIcon} from "@radix-ui/react-icons";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanDAL} from "src/dataAccessLogic/PlanDAL";
import {PlanJobTagDAL} from "src/dataAccessLogic/PlanJobTagDAL";
import {useGlobalContext} from "src/GlobalContext";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME, MIN_TIME}
  from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {CopyPlanToJobDoneModalContent} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/\
copyPlanToJobDoneModalContent/CopyPlanToJobDoneModalContent";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Plan} from "src/model/businessModel/Plan";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {DateUtils} from "src/utils/DateUtils";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/ReportsTablePlansCell.module.scss";

/**
 * Reports table plans cell props
 */
interface ReportsTablePlansCellProps {

  /**
   * All jobDone tags in the way
   */
  jobTags: JobTag[];

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
   * Callback for update dayReport
   */
  updateDayReport: (report: PartialWithUuid<DayReport>) => Promise<void>;

  /**
   * Create new day report
   */
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;
}

/**
 * Cell with plans in reports table
 */
export const ReportsTablePlansCell = (props: ReportsTablePlansCellProps) => {
  const {language} = useGlobalContext();

  /**
   * Create Plan
   */
  const createPlan = async (userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }

    const plan = await PlanDAL.createPlan(userUuid, props.dayReport.uuid);
    const plans = [...props.dayReport.plans, plan];

    props.updateDayReport({uuid: props.dayReport.uuid, plans});
  };

  /**
   * Delete plan
   */
  const deletePlan = async (planUuid: string) => {
    const plans = props.dayReport.plans.filter((plan) => plan.uuid !== planUuid);

    props.updateDayReport({uuid: props.dayReport.uuid, plans});
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
    const jobDone = await JobDoneDAL.createJobDone(ownerUuid, report.uuid, plan);

    const jobsDone = [...report.jobsDone, jobDone];

    await props.updateDayReport({uuid: report.uuid, jobsDone});
  };

  /**
   * Update plan
   */
  const updatePlan = async (planToUpdate: PartialWithUuid<Plan>) => {
    const updatedPlan = await PlanDAL.updatePlan(planToUpdate);
    const plans = [
      ...props.dayReport.plans.map((plan) => {
        return plan.uuid === planToUpdate.uuid
          ? updatedPlan
          : plan;
      }),
    ];

    await props.updateDayReport({uuid: props.dayReport.uuid, plans});
  };

  /**
   * Update labels in plan
   */
  const updateLabelsInPlan = async (params: {

    /**
     * Plan uuid
     */
    planUuid: string;

    /**
     * New updated list of tags
     */
    updatedTags: JobTag[];
  }) => {

    const oldPlan = props.dayReport.plans.find(plan => params.planUuid === plan.uuid);
    if (!oldPlan) {
      throw new Error(`No such plan with ${params.planUuid} uuid`);
    }
    const oldLabels = oldPlan.tags.map(label => label.uuid);
    const labelUuidsToAdd: string[] = params.updatedTags
      .map(label => label.uuid)
      .filter(labelUuid => !oldLabels.includes(labelUuid));
    const labelUuidsToDelete: string[] = oldLabels
      .filter(
        labelUuid => !params.updatedTags.map(label => label.uuid).includes(labelUuid),
      );

    const addPromises = labelUuidsToAdd.map(labelUuid => PlanJobTagDAL.createPlanJobTag({
      planUuid: params.planUuid,
      jobTagUuid: labelUuid,
    }));
    const deletePromises = labelUuidsToDelete.map(labelUuid => PlanJobTagDAL.deletePlanJobTag({
      planUuid: params.planUuid,
      jobTagUuid: labelUuid,
    }));

    Promise.all([
      ...addPromises,
      ...deletePromises,
    ]);

    const updatedPlans = props.dayReport.plans.map((plan) => {
      const isUpdatedPlan = plan.uuid === params.planUuid;
      if (isUpdatedPlan) {
        const newLabels = labelUuidsToAdd.map(labelUuidToAdd => {
          const newLabel = props.jobTags.find(tag => tag.uuid === labelUuidToAdd);
          if (!newLabel) {
            throw new Error(`Label with uuid ${labelUuidToAdd} is not defined`);
          }

          return newLabel;
        });
        const updatedTags = plan.tags
          .filter(oldLabel => !labelUuidsToDelete.includes(oldLabel.uuid))
          .concat(newLabels);

        const updatedPlan = new Plan({
          ...oldPlan,
          tags: updatedTags,
        });

        return updatedPlan;
      } else {
        return plan;
      }
    });

    props.updateDayReport({uuid: props.dayReport.uuid, plans: updatedPlans});
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
            <HorizontalContainer className={styles.horizontalContainer}>
              <HorizontalContainer className={styles.listNumberAndName}>
                {getListNumberByIndex(index)}
                <Link path={pages.user.getPath({uuid: plan.ownerUuid})}>
                  {getFirstName(plan.ownerName)}
                </Link>
              </HorizontalContainer>
              <HorizontalContainer className={styles.icons}>
                {props.isEditable ?
                  <Modal
                    trigger={plan.tags.length === 0 ?
                      <div className={styles.tagsBlockTrigger}>
                        {`Add${Symbols.NO_BREAK_SPACE}tag`}
                      </div>
                      :
                      <div className={styles.tagsBlockTrigger}>
                        <JobDoneTags jobDoneTags={plan.tags} />
                      </div>
                    }
                    content={
                      <ModalContentJobTags
                        jobTags={props.jobTags}
                        jobDoneTags={plan.tags}
                        isEditable={props.isEditable}
                        updateTags={(tagsToUpdate: JobTag[]) => updateLabelsInPlan({
                          planUuid: plan.uuid,
                          updatedTags: tagsToUpdate,
                        })}
                      />
                    }
                  />
                  : <JobDoneTags jobDoneTags={plan.tags} />
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
                    onChangeFinish={(time) => updatePlan({
                      uuid: plan.uuid,
                      time: getValidatedTime(Number(time)),
                    })}
                    className={styles.editableTime}
                    isEditable={plan.ownerUuid === props.user?.uuid}
                  />
                </Tooltip>
                {props.isEditable &&
                <Tooltip
                  content={LanguageService.way.reportsTable.columnTooltip.planCheckbox[language]}
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
                        updatePlan={updatePlan}
                      />
                    }
                  />

                </Tooltip>
                }
                {plan.ownerUuid === props.user?.uuid &&
                <Tooltip
                  content={LanguageService.way.reportsTable.columnTooltip.deletePlan[language]}
                  position={PositionTooltip.BOTTOM}
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`${LanguageService.way.reportsTable.modalWindow.deletePlanQuestion[language]} "${plan.description}"?`}
                    </p>}
                    onOk={() => deletePlan(plan.uuid)}
                    okText={LanguageService.way.reportsTable.modalWindow.deleteButton[language]}
                    cancelText={LanguageService.way.reportsTable.modalWindow.cancelButton[language]}
                  />
                </Tooltip>
                }
              </HorizontalContainer>
            </HorizontalContainer>
            <HorizontalContainer>
              <EditableTextarea
                text={plan.description}
                onChangeFinish={(description) => updatePlan({
                  uuid: plan.uuid,
                  description,
                })}
                isEditable={plan.ownerUuid === props.user?.uuid}
                className={styles.editableTextarea}
              />
            </HorizontalContainer>
          </li>
        ))}
      </ol>
      <div className={styles.summarySection}>
        <div>
          {props.isEditable &&
          <Tooltip
            content={LanguageService.way.reportsTable.columnTooltip.addPlan[language]}
            position={PositionTooltip.RIGHT}
          >
            <Button
              value={
                <Icon
                  size={IconSize.SMALL}
                  name="PlusIcon"
                />
              }
              onClick={() => createPlan(props.user?.uuid)}
              buttonType={ButtonType.ICON_BUTTON}
            />
          </Tooltip>
          }
        </div>
        <div className={styles.summaryText}>
          {`${LanguageService.way.reportsTable.total[language]}${Symbols.NO_BREAK_SPACE}`}
          {props.dayReport.plans
            .reduce((summaryTime, plan) => plan.time + summaryTime, DEFAULT_SUMMARY_TIME)
          }
        </div>
      </div>
    </VerticalContainer>
  );
};
