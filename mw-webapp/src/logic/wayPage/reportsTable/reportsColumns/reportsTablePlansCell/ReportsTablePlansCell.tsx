import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableValue} from "src/component/editableText/EditableText";
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
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {DEFAULT_SUMMARY_TIME, getListNumberByIndex, getValidatedTime, MAX_TIME}
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

  /**
   * Create Plan
   */
  const createPlan = async (userUuid?: string) => {
    const defaultTag = props.jobTags.find((jobTag) => jobTag.name === "no tags");
    if (!defaultTag) {
      throw new Error("Default tag is not exist");
    }

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
    // Const jobDone: JobDone = new JobDone({
    //   description: plan.job,
    //   time: plan.estimationTime,
    //   uuid: uuidv4(),
    //   tags: plan.tags,
    // });
    const jobDone = await JobDoneDAL.createJobDone(ownerUuid, report.uuid, plan);

    const jobsDone = [...report.jobsDone, jobDone];

    await props.updateDayReport({uuid: report.uuid, jobsDone});
  };

  /**
   * Update plan status
   */
  const updatePlan = async (planToUpdate: Plan) => {
    const plans = [
      ...props.dayReport.plans.map((plan) => {
        return plan.uuid === planToUpdate.uuid
          ? planToUpdate
          : plan;
      }),
    ];

    await props.updateDayReport({uuid: props.dayReport.uuid, plans});
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
                    trigger={
                      <div className={styles.tagsBlockTrigger}>
                        <JobDoneTags jobDoneTags={plan.tags} />
                      </div>
                    }
                    content={
                      <ModalContentJobTags
                        jobTags={props.jobTags}
                        jobDoneTags={plan.tags}
                        isEditable={props.isEditable}
                        updateTags={(tagsToUpdate: JobTag[]) => props.updateDayReport({
                          ...props.dayReport,
                          plans: props.dayReport.plans?.map(previousPlan => previousPlan.uuid === plan.uuid
                            ? {...previousPlan, tags: tagsToUpdate}
                            : previousPlan),
                        })}
                      />
                    }
                  />
                  : <JobDoneTags jobDoneTags={plan.tags} />
                }
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content={`Estimated${Symbols.NO_BREAK_SPACE}time for the plan`}
                >
                  <EditableValue
                    value={plan.time}
                    type="number"
                    max={MAX_TIME}
                    onChangeFinish={(estimationTime) => {
                      const updatedPlan = new Plan({
                        ...plan,
                        time: getValidatedTime(Number(estimationTime)),
                      });
                      updatePlan(updatedPlan);
                    }}
                    className={styles.editableTime}
                    isEditable={plan.ownerUuid === props.user?.uuid}
                  />
                </Tooltip>
                {props.isEditable &&
                <Tooltip
                  content={`Click${Symbols.NO_BREAK_SPACE}to${Symbols.NO_BREAK_SPACE}mark the plan as completed.
                                  Coming soon`}
                  position={PositionTooltip.RIGHT}
                >
                  <Modal
                    trigger={
                      <Checkbox
                        isEditable={!plan.isDone}
                        isDefaultChecked={plan.isDone}
                        onChange={() => {}}
                        className={styles.checkbox}
                      />
                    }
                    content={
                      <CopyPlanToJobDoneModalContent
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
                  content="Delete plan"
                  position={PositionTooltip.BOTTOM}
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`Are you sure you want to delete the plan "${plan.description}"?`}
                    </p>}
                    onOk={() => deletePlan(plan.uuid)}
                    okText="Delete"
                  />
                </Tooltip>
                }
              </HorizontalContainer>
            </HorizontalContainer>
            <HorizontalContainer>
              <EditableTextarea
                text={plan.description}
                onChangeFinish={(text) => {
                  const updatedPlan = new Plan({
                    ...plan,
                    description: text,
                  });
                  updatePlan(updatedPlan);
                }}
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
            content="Add plan"
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
              className={styles.flatButton}
            />
          </Tooltip>
          }
        </div>
        <div className={styles.summaryText}>
          {"Total: "}
          {props.dayReport.plans
            .reduce((summaryTime, plan) => plan.time + summaryTime, DEFAULT_SUMMARY_TIME)
          }
        </div>
      </div>
    </VerticalContainer>
  );
};
