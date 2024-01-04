import {TrashIcon} from "@radix-ui/react-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {Problem} from "src/model/businessModel/Problem";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {Symbols} from "src/utils/Symbols";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/reportsTable/WayColumns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();

/**
 * Params for {@link renderModalContent}
 */
interface RenderModalContentParams {

  /**
   * Modal prompt
   */
  description: string;

  /**
   * On Ok callback
   */
  onOk: () => void;
}

/**
 * Render modal content
 * TODO: use modal instead of confirm task #305
 */
export const renderModalContent = (params: RenderModalContentParams) => {
  const isAccepted = confirm(params.description);
  isAccepted && params.onOk();
};

/**
 * Get user name
 */
const getName = (
  mentors: Map<string, UserPreview>,
  formerMentors: Map<string, UserPreview>,
  mentorUuid: string,
  ownerName: string) => {
  const mentorName = mentors.get(mentorUuid) || formerMentors.get(mentorUuid);

  const name = mentorName ? mentorName.name : ownerName;
  const firstName = getFirstName(name);

  return firstName;
};

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * DayReports
   */
  dayReports: DayReport[];

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
 * Update DayReport state
 */
const updateDayReportState = (
  dayReports: DayReport[],
  setReports: (dayReports: DayReport[]) => void,
  updatedDayReport: DayReport) => {
  const updatedDayReports = dayReports.map((item) => {
    if (item.uuid === updatedDayReport.uuid) {
      return updatedDayReport;
    }

    return item;
  });

  setReports(updatedDayReports);
};

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = useGlobalContext();
  const ownerUuid = props.way.owner.uuid;
  const ownerName = props.way.owner.name;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  const columns = [
    columnHelper.accessor("createdAt", {
      header: "Date",

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
      header: "Jobs done (minutes)",

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => {

        /**
         * Create jobDone
         */
        const createJobDone = async () => {
          const jobDone: JobDone = new JobDone({
            description: "",
            time: 0,
            uuid: uuidv4(),
            tags: [],
          });
          const jobsDone = [...row.original.jobsDone, jobDone];
          const updatedDayReport = new DayReport({...row.original, jobsDone});
          await DayReportDAL.updateDayReport(updatedDayReport);
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Delete jobDone
         */
        const deleteJobDone = async (jobDoneUuid: string) => {
          const jobsDone = row.original.jobsDone.filter((jobDone) => jobDone.uuid !== jobDoneUuid);
          const updatedDayReport = new DayReport({...row.original, jobsDone});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update jobDone
         */
        const updateJobDone = async (jobDone: JobDone, text: string) => {
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            const itemToReturn = item.uuid === jobDone.uuid
              ? new JobDone({
                ...jobDone,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, jobsDone: updatedJobsDone});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update jobDoneTime
         */
        const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            const itemToReturn = item.uuid === jobDone.uuid
              ? new JobDone({
                ...jobDone,
                time: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, jobsDone: updatedJobsDone});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        return (
          <VerticalContainer>
            <ol className={styles.numberedList}>
              {row.original.jobsDone.map((jobDone) => (
                <li key={jobDone.uuid}>
                  <HorizontalContainer>
                    <HorizontalContainer className={styles.numberedListItem}>
                      <EditableTextarea
                        text={jobDone.description}
                        onChangeFinish={(text) => updateJobDone(jobDone, text)}
                        isEditable={isOwner}
                        className={styles.editableTextarea}
                      />
                      <EditableText
                        text={jobDone.time}
                        onChangeFinish={(text) => updateJobDoneTime(jobDone, text)}
                        className={styles.editableTime}
                        isEditable={isOwner}
                      />
                    </HorizontalContainer>
                    {isOwner &&
                      <Tooltip content="Delete jobDone">
                        <TrashIcon
                          className={styles.icon}
                          onClick={() => renderModalContent({
                            description: `Are you sure that you want to delete jobDone "${jobDone.description}"?`,

                            /**
                             * CallBack triggered on press ok
                             */
                            onOk: () => deleteJobDone(jobDone.uuid),
                          })
                          }
                        />
                      </Tooltip>
                    }
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              {isOwner &&
                <Tooltip
                  content="Add job"
                  position={PositionTooltip.TOP}
                >
                  <Button
                    value={Symbols.PLUS}
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
      header: "Plans (minutes)",

      /**
       * Cell with Plan items
       */
      cell: ({row}) => {

        /**
         * Create Plan
         */
        const createPlan = async (userUuid: string) => {
          const plan: Plan = new Plan({
            job: "",
            ownerUuid: userUuid,
            uuid: uuidv4(),
            tags: [],
            estimationTime: 0,
          });
          const plans = [...row.original.plans, plan];
          const updatedDayReport = new DayReport({...row.original, plans});
          await DayReportDAL.updateDayReport(updatedDayReport);
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Delete plan
         */
        const deletePlan = async (planUuid: string) => {
          const plans = row.original.plans.filter((plan) => plan.uuid !== planUuid);
          const updatedDayReport = new DayReport({...row.original, plans});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update Plan
         */
        const updatePlan = async (plan: Plan, text: string) => {
          const updatedPlans = row.original.plans.map((item) => {
            const itemToReturn = item.uuid === plan.uuid
              ? new Plan({
                ...plan,
                job: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, plans: updatedPlans});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update Plan time
         */
        const updatePlanTime = async (plan: Plan, text: number) => {
          const updatedPlans = row.original.plans.map((item) => {
            const itemToReturn = item.uuid === plan.uuid
              ? new Plan({
                ...plan,
                estimationTime: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, plans: updatedPlans});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        return (
          <VerticalContainer>
            <ol className={styles.numberedList}>
              {row.original.plans.map((plan) => (
                <li key={plan.uuid}>
                  <HorizontalContainer className={styles.numberedListItem}>
                    <VerticalContainer>
                      <HorizontalContainer className={styles.horizontalContainer}>
                        <Link
                          value={getName(props.way.mentors, props.way.formerMentors, plan.ownerUuid, ownerName)}
                          path={pages.user.getPath({uuid: plan.ownerUuid})}
                        />
                        <HorizontalContainer className={styles.icons}>
                          {isOwner &&
                          <Tooltip content="Coming soon">
                            <Checkbox
                              onChange={() => {}}
                              className={styles.checkbox}
                            />
                          </Tooltip>
                          }
                          {plan.ownerUuid === user?.uuid &&
                          <Tooltip content="Delete plan">
                            <TrashIcon
                              className={styles.icon}
                              onClick={() => renderModalContent({
                                description: `Are you sure that you want to delete plan "${plan.job}"?`,

                                /**
                                 * CallBack triggered on press ok
                                 */
                                onOk: () => deletePlan(plan.uuid),
                              })
                              }
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
                        <EditableText
                          text={plan.estimationTime}
                          onChangeFinish={(value) => updatePlanTime(plan, value)}
                          className={styles.editableTime}
                          isEditable={plan.ownerUuid === user?.uuid}
                        />
                      </HorizontalContainer>
                    </VerticalContainer>
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              <div>
                {isUserOwnerOrMentor &&
                <Tooltip
                  content="Add plan"
                  position={PositionTooltip.TOP}
                >
                  <Button
                    value={Symbols.PLUS}
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
      header: "Problems",

      /**
       * Cell with Problems items
       */
      cell: ({row}) => {

        /**
         * Create Problem
         */
        const createProblem = async (userUuid: string) => {
          const problem: Problem = new Problem({
            description: "",
            ownerUuid: userUuid,
            isDone: false,
            uuid: uuidv4(),
            tags: [],
          });
          const problems = [...row.original.problems, problem];
          const updatedDayReport = new DayReport({...row.original, problems});
          await DayReportDAL.updateDayReport(updatedDayReport);
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Delete Problem
         */
        const deleteProblem = async (problemUuid: string) => {
          const problems = row.original.problems.filter((problem) => problem.uuid !== problemUuid);
          const updatedDayReport = new DayReport({...row.original, problems});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update Problem
         */
        const updateProblem = async (problem: Problem, text: string) => {
          const updatedProblems = row.original.problems.map((item) => {
            const itemToReturn = item.uuid === problem.uuid
              ? new Problem({
                ...problem,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, problems: updatedProblems});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        return (
          <VerticalContainer>
            <ol className={styles.numberedList}>
              {row.original.problems.map((problem) => (
                <li key={problem.uuid}>
                  <HorizontalContainer className={styles.numberedListItem}>
                    <VerticalContainer>
                      <HorizontalContainer className={styles.horizontalContainer}>
                        <Link
                          value={getName(props.way.mentors, props.way.formerMentors, problem.ownerUuid, ownerName)}
                          path={pages.user.getPath({uuid: problem.ownerUuid})}
                        />
                        <HorizontalContainer className={styles.icons}>
                          {isOwner &&
                          <Tooltip content="Coming soon">
                            <Checkbox
                              onChange={() => {}}
                              className={styles.checkbox}
                            />
                          </Tooltip>
                          }
                          {problem.ownerUuid === user?.uuid &&
                          <Tooltip content="Delete problem">
                            <TrashIcon
                              className={styles.icon}
                              onClick={() => renderModalContent({
                                description: `Are you sure that you want to delete problem "${problem.description}"?`,

                                /**
                                 * CallBack triggered on press ok
                                 */
                                onOk: () => deleteProblem(problem.uuid),
                              })
                              }
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
                    </VerticalContainer>
                  </HorizontalContainer>
                </li>
              ))}
            </ol>
            <div className={styles.summarySection}>
              {isUserOwnerOrMentor &&
              <Tooltip
                content="Add problem"
                position={PositionTooltip.TOP}
              >
                <Button
                  value={Symbols.PLUS}
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
      header: "Comments",

      /**
       * Cell with Comments items
       */
      cell: ({row}) => {

        /**
         * Create Comment
         */
        const createComment = async (commentatorUuid: string) => {
          const comment: Comment = new Comment({
            description: "",
            ownerUuid: commentatorUuid,
            isDone: false,
            uuid: uuidv4(),
          });
          const comments = [...row.original.comments, comment];
          const updatedDayReport = new DayReport({...row.original, comments});
          await DayReportDAL.updateDayReport(updatedDayReport);
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Delete Comment
         */
        const deleteComment = async (commentUuid: string) => {
          const comments = row.original.comments.filter((comment) => comment.uuid !== commentUuid);
          const updatedDayReport = new DayReport({...row.original, comments});
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
          await DayReportDAL.updateDayReport(updatedDayReport);
        };

        /**
         * Update Comment
         */
        const updateComment = async (comment: Comment, text: string) => {
          const updatedComments = row.original.comments.map((item) => {
            const itemToReturn = item.uuid === comment.uuid
              ? new Comment({
                ...comment,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = new DayReport({...row.original, comments: updatedComments});
          await DayReportDAL.updateDayReport(updatedDayReport);
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer>
            <ol className={styles.comments}>
              {row.original.comments
                .map((comment) => (
                  <li
                    key={comment.uuid}
                    className={styles.comment}
                  >
                    <HorizontalContainer key={comment.uuid}>
                      <VerticalContainer>
                        <HorizontalContainer className={styles.horizontalContainer}>
                          <Link
                            value={getName(props.way.mentors, props.way.formerMentors, comment.ownerUuid, ownerName)}
                            path={pages.user.getPath({uuid: comment.ownerUuid})}
                          />
                          {comment.ownerUuid === user?.uuid &&
                            <Tooltip
                              content="Delete comment"
                              position={PositionTooltip.LEFT}
                            >
                              <TrashIcon
                                className={styles.icon}
                                onClick={() => renderModalContent({
                                  description: `Are you sure that you want to delete comment "${comment.description}"?`,

                                  /**
                                   * CallBack triggered on press ok
                                   */
                                  onOk: () => deleteComment(comment.uuid),
                                })
                                }
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
                      </VerticalContainer>
                    </HorizontalContainer>
                  </li>
                ),
                )}
            </ol>
            <div className={styles.summarySection}>
              {isUserOwnerOrMentor &&
              <Tooltip
                content="Add comment"
                position={PositionTooltip.TOP}
              >
                <Button
                  value={Symbols.PLUS}
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
