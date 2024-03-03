import {TrashIcon} from "@radix-ui/react-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {clsx} from "clsx";
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
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {JobDoneTags} from "src/logic/wayPage/reportsTable/jobDoneTags/JobDoneTags";
import {ModalContentJobTags} from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {Problem} from "src/model/businessModel/Problem";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();
const DIFFERENCE_INDEX_LIST_NUMBER = 1;
const MAX_TIME = 1440;

/**
 * Get time in minutes till {@link MAX_TIME}
 */
const getValidatedTime = (time: number) => {
  return time <= MAX_TIME
    ? time
    : MAX_TIME;
};

/**
 * Convert index of element to list number
 */
const getListNumberByIndex = (index: number) => {
  const listNumber = `${index + DIFFERENCE_INDEX_LIST_NUMBER}.${Symbols.NO_BREAK_SPACE}`;

  return listNumber;
};

/**
 * Get all users involved in the {@link way}
 */
const getUsersInWay = (way: Way) => {
  const usersInWay: Map<string, UserPreview> = new Map([
    ...way.mentors.entries(),
    ...way.formerMentors.entries(),
    [way.owner.uuid, way.owner],
  ]);

  return usersInWay;
};

/**
 * Get user name
 */
const getName = (way: Way, userUuid: string) => {
  const usersInWay = getUsersInWay(way);
  const user = usersInWay.get(userUuid);

  if (!user) {
    throw Error(`User with uuid ${userUuid} is not defined`);
  }

  const firstName = getFirstName(user.name);

  return firstName;
};

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * Callback that change dayReports
   */
  setDayReports: (dayReports: DayReport[]) => void;

  /**
   * Way
   */
  way: Way;
}

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = useGlobalContext();
  const ownerUuid = props.way.owner.uuid;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  /**
   * Update DayReport
   */
  const updateReport = async (report: PartialWithUuid<DayReport>) => {
    const reportToUpdate = props.way.dayReports.find(dayReport => dayReport.uuid === report.uuid);
    if (!reportToUpdate) {
      throw new Error(`Report with uuid ${report.uuid} is undefined`);
    }

    const updatedReport = new DayReport({...reportToUpdate, ...report});
    const updatedDayReports = props.way.dayReports.map(dayReport => dayReport.uuid === report.uuid
      ? updatedReport
      : dayReport,
    );

    props.setDayReports(updatedDayReports);
    await DayReportDAL.updateDayReport(updatedReport);
  };

  const columns = [
    columnHelper.accessor("createdAt", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Date, when day report was created"
        >
          Date
        </Tooltip>
      ),

      /**
       * Cell  with date value
       */
      cell: ({row}) => {
        return (
          <VerticalContainer className={styles.dateCell}>
            {DateUtils.getShortISODateValue(row.original.createdAt)}
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("jobsDone", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="The most specific and decomposed jobs related to this way (in minutes)"
        >
          Jobs done
        </Tooltip>
      ),

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => {
        const defaultTag = props.way.jobTags.find((jobTag) => jobTag.name === "no tag");
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
          const jobsDone = [...row.original.jobsDone, jobDone];

          updateReport({uuid: row.original.uuid, jobsDone});
        };

        /**
         * Delete jobDone
         */
        const deleteJobDone = (jobDoneUuid: string) => {
          const jobsDone = row.original.jobsDone.filter((jobDone) => jobDone.uuid !== jobDoneUuid);

          updateReport({uuid: row.original.uuid, jobsDone});
        };

        /**
         * Update jobDone
         */
        const updateJobDone = (jobDone: JobDone, text: string) => {
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            const itemToReturn = item.uuid === jobDone.uuid
              ? new JobDone({
                ...jobDone,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, jobsDone: updatedJobsDone});
        };

        /**
         * Update jobDoneTime
         */
        const updateJobDoneTime = (jobDone: JobDone, time: number) => {
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            const itemToReturn = item.uuid === jobDone.uuid
              ? new JobDone({
                ...jobDone,
                time,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, jobsDone: updatedJobsDone});
        };

        return (
          <VerticalContainer className={styles.list}>
            <ol className={styles.numberedList}>
              {row.original.jobsDone.map((jobDone, index) => (
                <li
                  key={jobDone.uuid}
                  className={styles.numberedListItem}
                >
                  <HorizontalContainer className={clsx(styles.horizontalContainer, styles.listNumberAndName)}>
                    {getListNumberByIndex(index)}
                    <HorizontalContainer className={styles.icons}>
                      {isUserOwnerOrMentor ?
                        <Modal
                          trigger={
                            <div className={styles.tagsBlockTrigger}>
                              <JobDoneTags jobDoneTags={jobDone.tags} />
                            </div>
                          }
                          content={
                            <ModalContentJobTags
                              jobTags={props.way.jobTags}
                              jobDoneTags={jobDone.tags}
                              isEditable={isUserOwnerOrMentor}
                              updateTags={(tagsToUpdate: JobTag[]) => updateReport({
                                ...row.original,
                                jobsDone: row.original.jobsDone?.map(previousJobDone => previousJobDone.uuid === jobDone.uuid
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
                          isEditable={isUserOwnerOrMentor}
                        />
                      </Tooltip>
                      {isUserOwnerOrMentor &&
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
                    isEditable={isUserOwnerOrMentor}
                    className={styles.editableTextarea}
                  />
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              {isUserOwnerOrMentor &&
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
                {row.original.jobsDone
                  .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
                }
              </div>
            </div>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("plans", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Plans related to this way (in minutes)"
        >
          Plans
        </Tooltip>
      ),

      /**
       * Cell with Plan items
       */
      cell: ({row}) => {

        /**
         * Create Plan
         */
        const createPlan = (userUuid: string) => {
          const defaultTag = props.way.jobTags.find((jobTag) => jobTag.name === "no tag");
          if (!defaultTag) {
            throw new Error("Default tag is not exist");
          }

          const plan: Plan = new Plan({
            job: "",
            ownerUuid: userUuid,
            uuid: uuidv4(),
            tags: [defaultTag],
            estimationTime: 0,
          });
          const plans = [...row.original.plans, plan];

          updateReport({uuid: row.original.uuid, plans});
        };

        /**
         * Delete plan
         */
        const deletePlan = (planUuid: string) => {
          const plans = row.original.plans.filter((plan) => plan.uuid !== planUuid);

          updateReport({uuid: row.original.uuid, plans});
        };

        /**
         * Update Plan
         */
        const updatePlan = (plan: Plan, text: string) => {
          const updatedPlans = row.original.plans.map((item) => {
            const itemToReturn = item.uuid === plan.uuid
              ? new Plan({
                ...plan,
                job: text,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, plans: updatedPlans});
        };

        /**
         * Update Plan time
         */
        const updatePlanTime = (plan: Plan, estimationTime: number) => {
          const updatedPlans = row.original.plans.map((item) => {
            const itemToReturn = item.uuid === plan.uuid
              ? new Plan({
                ...plan,
                estimationTime,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, plans: updatedPlans});
        };

        return (
          <VerticalContainer className={styles.list}>
            <ol className={styles.numberedList}>
              {row.original.plans.map((plan, index) => (
                <li
                  key={plan.uuid}
                  className={styles.numberedListItem}
                >
                  <HorizontalContainer className={styles.horizontalContainer}>
                    <HorizontalContainer className={styles.listNumberAndName}>
                      {getListNumberByIndex(index)}
                      <Link path={pages.user.getPath({uuid: plan.ownerUuid})}>
                        {getName(props.way, plan.ownerUuid)}
                      </Link>
                    </HorizontalContainer>
                    <HorizontalContainer className={styles.icons}>
                      {isUserOwnerOrMentor ?
                        <Modal
                          trigger={
                            <div className={styles.tagsBlockTrigger}>
                              <JobDoneTags jobDoneTags={plan.tags} />
                            </div>
                          }
                          content={
                            <ModalContentJobTags
                              jobTags={props.way.jobTags}
                              jobDoneTags={plan.tags}
                              isEditable={isUserOwnerOrMentor}
                              updateTags={(tagsToUpdate: JobTag[]) => updateReport({
                                ...row.original,
                                plans: row.original.plans?.map(previousPlan => previousPlan.uuid === plan.uuid
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
                          value={plan.estimationTime}
                          type="number"
                          max={MAX_TIME}
                          onChangeFinish={(estimationTime) => updatePlanTime(plan, getValidatedTime(Number(estimationTime)))}
                          className={styles.editableTime}
                          isEditable={plan.ownerUuid === user?.uuid}
                        />
                      </Tooltip>
                      {isUserOwnerOrMentor &&
                      <Tooltip
                        content={`Click${Symbols.NO_BREAK_SPACE}to${Symbols.NO_BREAK_SPACE}mark the plan as completed.
                              Coming soon`}
                        position={PositionTooltip.RIGHT}
                      >
                        <Checkbox
                          onChange={() => {}}
                          className={styles.checkbox}
                        />
                      </Tooltip>
                      }
                      {plan.ownerUuid === user?.uuid &&
                      <Tooltip
                        content="Delete plan"
                        position={PositionTooltip.BOTTOM}
                      >
                        <Confirm
                          trigger={<TrashIcon className={styles.icon} />}
                          content={<p>
                            {`Are you sure you want to delete the plan "${plan.job}"?`}
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
                      text={plan.job}
                      onChangeFinish={(text) => updatePlan(plan, text)}
                      isEditable={plan.ownerUuid === user?.uuid}
                      className={styles.editableTextarea}
                    />
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              <div className={styles.wrap}>
                {isUserOwnerOrMentor &&
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
                    onClick={() => createPlan(user.uuid)}
                    className={styles.flatButton}
                  />
                </Tooltip>
                }
              </div>
              <div className={styles.summaryText}>
                {"Total: "}
                {row.original.plans
                  .reduce((summaryTime, plan) => plan.estimationTime + summaryTime, DEFAULT_SUMMARY_TIME)
                }
              </div>
            </div>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("problems", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Problems you encountered while completing the task"
        >
          Problems
        </Tooltip>
      ),

      /**
       * Cell with Problems items
       */
      cell: ({row}) => {

        /**
         * Create Problem
         */
        const createProblem = (userUuid: string) => {
          const problem: Problem = new Problem({
            description: "",
            ownerUuid: userUuid,
            isDone: false,
            uuid: uuidv4(),
            tags: [],
          });
          const problems = [...row.original.problems, problem];

          updateReport({uuid: row.original.uuid, problems});
        };

        /**
         * Delete Problem
         */
        const deleteProblem = (problemUuid: string) => {
          updateReport({
            uuid: row.original.uuid,
            problems: row.original.problems.filter((problem) => problem.uuid !== problemUuid),
          });
        };

        /**
         * Update Problem
         */
        const updateProblem = (problem: Problem, text: string) => {
          const updatedProblems = row.original.problems.map((item) => {
            const itemToReturn = item.uuid === problem.uuid
              ? new Problem({
                ...problem,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, problems: updatedProblems});
        };

        return (
          <VerticalContainer className={styles.list}>
            <ol className={styles.numberedList}>
              {row.original.problems.map((problem, index) => (
                <li
                  key={problem.uuid}
                  className={styles.numberedListItem}
                >
                  <HorizontalContainer className={styles.horizontalContainer}>
                    <HorizontalContainer className={styles.listNumberAndName}>
                      {getListNumberByIndex(index)}
                      <Link path={pages.user.getPath({uuid: problem.ownerUuid})}>
                        {getName(props.way, problem.ownerUuid)}
                      </Link>
                    </HorizontalContainer>
                    <HorizontalContainer className={styles.icons}>
                      {isUserOwnerOrMentor &&
                      <Tooltip
                        position={PositionTooltip.RIGHT}
                        content={`Click${Symbols.NO_BREAK_SPACE}to${Symbols.NO_BREAK_SPACE}mark
                            the problem as completed. Coming soon`}
                      >
                        <Checkbox
                          onChange={() => {}}
                          className={styles.checkbox}
                        />
                      </Tooltip>
                      }
                      {problem.ownerUuid === user?.uuid &&
                      <Tooltip
                        content="Delete problem"
                        position={PositionTooltip.BOTTOM}
                      >
                        <Confirm
                          trigger={<TrashIcon className={styles.icon} />}
                          content={<p>
                            {`Are you sure you want to delete the problem "${problem.description}"?`}
                          </p>}
                          onOk={() => deleteProblem(problem.uuid)}
                          okText="Delete"
                        />
                      </Tooltip>
                      }
                    </HorizontalContainer>
                  </HorizontalContainer>
                  <EditableTextarea
                    text={problem.description}
                    onChangeFinish={(text) => updateProblem(problem, text)}
                    isEditable={problem.ownerUuid === user?.uuid}
                    className={styles.editableTextarea}
                  />
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              {isUserOwnerOrMentor &&
              <Tooltip
                content="Add problem"
                position={PositionTooltip.RIGHT}
              >
                <Button
                  value={
                    <Icon
                      size={IconSize.SMALL}
                      name="PlusIcon"
                    />
                  }
                  onClick={() => createProblem(user.uuid)}
                  className={styles.flatButton}
                />
              </Tooltip>
              }
            </div>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("comments", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content="Explanations from the mentor and any information related to completing this path"
        >
          Comments
        </Tooltip>
      ),

      /**
       * Cell with Comments items
       */
      cell: ({row}) => {

        /**
         * Create Comment
         */
        const createComment = (commentatorUuid: string) => {
          const comment: Comment = new Comment({
            description: "",
            ownerUuid: commentatorUuid,
            isDone: false,
            uuid: uuidv4(),
          });
          const comments = [...row.original.comments, comment];

          updateReport({uuid: row.original.uuid, comments});
        };

        /**
         * Delete Comment
         */
        const deleteComment = (commentUuid: string) => {
          updateReport({
            uuid: row.original.uuid,
            comments: row.original.comments.filter((comment) => comment.uuid !== commentUuid),
          });
        };

        /**
         * Update Comment
         */
        const updateComment = (comment: Comment, text: string) => {
          const updatedComments = row.original.comments.map((item) => {
            const itemToReturn = item.uuid === comment.uuid
              ? new Comment({
                ...comment,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          updateReport({uuid: row.original.uuid, comments: updatedComments});
        };

        return (
          <VerticalContainer className={styles.list}>
            <ol className={styles.numberedList}>
              {row.original.comments
                .map((comment, index) => (
                  <li
                    key={comment.uuid}
                    className={styles.numberedListItem}
                  >
                    <HorizontalContainer className={styles.horizontalContainer}>
                      <HorizontalContainer className={styles.listNumberAndName}>
                        {getListNumberByIndex(index)}
                        <Link path={pages.user.getPath({uuid: comment.ownerUuid})}>
                          {getName(props.way, comment.ownerUuid)}
                        </Link>
                      </HorizontalContainer>
                      {comment.ownerUuid === user?.uuid &&
                        <Tooltip
                          content="Delete comment"
                          position={PositionTooltip.LEFT}
                        >
                          <Confirm
                            trigger={<TrashIcon className={styles.icon} />}
                            content={<p>
                              {`Are you sure you want to delete the comment "${comment.description}"?`}
                            </p>}
                            onOk={() => deleteComment(comment.uuid)}
                            okText="Delete"
                          />
                        </Tooltip>
                      }
                    </HorizontalContainer>
                    <HorizontalContainer>
                      <EditableTextarea
                        text={comment.description}
                        onChangeFinish={(text) => updateComment(comment, text)}
                        isEditable={comment.ownerUuid === user?.uuid}
                        className={styles.editableTextarea}
                      />
                    </HorizontalContainer>
                  </li>
                ),
                )}
            </ol>
            <div className={styles.summarySection}>
              {isUserOwnerOrMentor &&
              <Tooltip
                position={PositionTooltip.LEFT}
                content="Add comment"
              >
                <Button
                  value={
                    <Icon
                      size={IconSize.SMALL}
                      name="PlusIcon"
                    />
                  }
                  onClick={() => createComment(user.uuid)}
                  className={styles.flatButton}
                />
              </Tooltip>
              }
            </div>
          </VerticalContainer>
        );
      },
    }),
  ];

  return columns;
};
